from app.database_models.scenario import Scenario
from app.models.model_factory import get_model
from app.ai_judge.scenario_evaluator import ScenarioEvaluator
from app.database_models.attack_run import AttackRun
from app.database_models.attack_results import AttackResult
from datetime import datetime

SCENARIOS_PER_ATTACK = 10

class AttackService:

    def run_attack(
        self,
        db,
        user_id,
        model_type,
        selected_attack_types,
        endpoint_url=None,
        api_key=None
    ):
        normalized_attack_types = [
            attack_type.value if hasattr(attack_type, "value") else attack_type
            for attack_type in selected_attack_types
        ]
        target_model = get_model(model_type, endpoint_url=endpoint_url, api_key=api_key)
        evaluator_model = get_model("judge")
        evaluator = ScenarioEvaluator(evaluator_model)
        include_improvement = model_type == "user"
        used_scenario_ids = (
            db.query(AttackResult.scenario_id)
            .join(AttackRun, AttackResult.attack_run_id == AttackRun.id)
            .filter(AttackRun.user_id == user_id)
            .all()
        )

        used_scenario_ids = {item[0] for item in used_scenario_ids}

        attack_run = AttackRun(
            user_id=user_id,
            model_provider=model_type,
            model_name=model_type,
            selected_attack_types=",".join(normalized_attack_types),
            status="running"
        )

        db.add(attack_run)
        db.commit()
        db.refresh(attack_run)

        try:
            collected_items = []

            for attack_type in normalized_attack_types:
                scenarios = db.query(Scenario).filter(
                    Scenario.attack_type == attack_type
                ).all()

                available_scenarios = [
                    scenario for scenario in scenarios
                    if scenario.scenario_code not in used_scenario_ids
                ]
                selected_scenarios = available_scenarios[:SCENARIOS_PER_ATTACK]

                for scenario in selected_scenarios:
                    response = target_model.generate(scenario.prompt)

                    collected_items.append({  #+
                        "scenario_id": scenario.scenario_code,
                        "attack_type": attack_type,
                        "severity": scenario.severity,
                        "prompt": scenario.prompt,
                        "expected_behavior": scenario.expected_behavior,
                        "model_response": response
                    })

                    used_scenario_ids.add(scenario.scenario_code)
                
            for item in collected_items:
                scenario_id = item["scenario_id"]
                judge_item = {
                    "attack_type": item["attack_type"],
                    "severity": item["severity"],
                    "prompt": item["prompt"],
                    "expected_behavior": item["expected_behavior"],
                    "model_response": item["model_response"]
                }

                evaluation = evaluator.evaluate_one(judge_item, include_improvement=include_improvement)
                response_safe_to_show = (
                    evaluation.get("response_safe_to_show", False)
                    and evaluation.get("passed", False)
                )
                unsafe_categories = evaluation.get("unsafe_categories", [])
                if isinstance(unsafe_categories, list):
                    unsafe_categories = ",".join(unsafe_categories)


                result = AttackResult(
                    attack_run_id=attack_run.id,
                    attack_type=item["attack_type"], 
                    scenario_id=scenario_id,
                    severity=item["severity"],
                    model_response=(
                        item["model_response"]
                        if response_safe_to_show
                        else "[hidden]"
                    ),
                    passed=evaluation.get("passed", False),
                    risk_score=evaluation.get("risk_score", 100),
                    evaluation_reason=evaluation.get("reason", "No evaluation reason returned."),
                    improvement=evaluation.get("improvement"),
                    response_safe_to_show=response_safe_to_show,
                    evidence_summary=evaluation.get("evidence_summary"), 
                    unsafe_categories=unsafe_categories,
                )

                db.add(result)

            end_time = datetime.utcnow()
            attack_run.completed_at = end_time
            attack_run.duration_seconds = int((end_time - attack_run.created_at).total_seconds())
            attack_run.status = "completed"

            db.commit()
            db.refresh(attack_run)

            return attack_run

        except Exception:
            db.rollback()
            attack_run.status = "failed"
            db.add(attack_run)
            db.commit()
            raise

    def get_attack_run_by_id(self, db, attack_run_id):
        return db.query(AttackRun).filter(
            AttackRun.id == attack_run_id
        ).first()

    def get_attack_runs_by_user_id(self, db, user_id):
        return db.query(AttackRun).filter(
            AttackRun.user_id == user_id
        ).all()