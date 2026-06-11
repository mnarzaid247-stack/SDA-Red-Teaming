from app.database_models.scenario import Scenario
from app.extensions import SessionLocal
from app.models.model_factory import get_model
from app.ai_judge.scenario_evaluator import ScenarioEvaluator
from app.ai_judge.overall_evaluator import OverallEvaluator
from app.database_models.attack_run import AttackRun
from app.database_models.attack_results import AttackResult
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

SCENARIOS_PER_ATTACK = 10
MAX_CONCURRENT_MODEL_CALLS = 5

class AttackService:


    def _generate_response(self, target_model, scenario, attack_type):
        retries = 3
        for attempt in range(retries):
            try:
                response = target_model.generate(scenario.prompt)
                return {
                    "scenario_id": scenario.scenario_code,
                    "attack_type": attack_type,
                    "severity": scenario.severity,
                    "prompt": scenario.prompt,
                    "expected_behavior": scenario.expected_behavior,
                    "model_response": response
                }

            except Exception as error:
                error_text = str(error).lower()

                is_rate_limit = (
                    "429" in error_text
                    or "rate limit" in error_text
                    or "too many requests" in error_text
                    or "quota" in error_text
                )
                if not is_rate_limit:
                    raise

                if attempt == retries - 1:
                    raise

                wait_time = 5 * (attempt + 1)

                print(
                    f"Rate limit reached for scenario "
                    f"{scenario.scenario_code}. "
                    f"Waiting {wait_time} seconds..."
                )

                time.sleep(wait_time)

    def run_attack(
        self,
        db,
        user_id,
        model_type,
        selected_attack_types,
        endpoint_url=None,
        api_key=None,
        background_tasks=None
    ):
        normalized_attack_types = [
            attack_type.value if hasattr(attack_type, "value") else attack_type
            for attack_type in selected_attack_types
        ]
        target_model = get_model(model_type, endpoint_url=endpoint_url, api_key=api_key)
        evaluator_model = get_model("judge")
        overall_evaluator = OverallEvaluator(evaluator_model)
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

                if len(available_scenarios) < SCENARIOS_PER_ATTACK:
                    available_scenarios = scenarios

                selected_scenarios = available_scenarios[:SCENARIOS_PER_ATTACK]

                
                with ThreadPoolExecutor(max_workers=MAX_CONCURRENT_MODEL_CALLS) as executor:
                    futures = [
                        executor.submit(
                            self._generate_response,
                            target_model,
                            scenario,
                            attack_type
                        )
                        for scenario in selected_scenarios
                    ]

                    for future in as_completed(futures):
                        item = future.result()

                        collected_items.append(item)

                        used_scenario_ids.add(item["scenario_id"])
            
            overall_result = overall_evaluator.evaluate(collected_items, include_improvement=include_improvement)
            attack_run.overall_passed = overall_result.get("passed")
            attack_run.overall_risk_score = overall_result.get("risk_score")
            attack_run.overall_risk_level = overall_result.get("risk_level")
            attack_run.overall_total_count = overall_result.get("total_count")
            attack_run.overall_safe_count = overall_result.get("safe_count")
            attack_run.overall_unsafe_count = overall_result.get("unsafe_count")
            attack_run.overall_evidence_summary = overall_result.get("evidence_summary")
            attack_run.overall_improvement = overall_result.get("improvement")
            
            for item in collected_items:
                result = AttackResult(
                    attack_run_id=attack_run.id,
                    attack_type=item["attack_type"],
                    scenario_id=item["scenario_id"],
                    severity=item["severity"],
                    model_response="[pending evaluation]",
                    passed=None,
                    risk_score=None,
                    evaluation_reason="Scenario evaluation is pending.",
                    improvement=None,
                    response_safe_to_show=False,
                    evidence_summary=None,
                    unsafe_categories=None
                )

                db.add(result)

            end_time = datetime.utcnow()
            attack_run.completed_at = end_time
            attack_run.duration_seconds = int((end_time - attack_run.created_at).total_seconds())
            attack_run.status = "completed"

            db.commit()
            db.refresh(attack_run)
            if background_tasks:
                background_tasks.add_task(self.evaluate_scenarios_background, attack_run.id,
                    model_type, collected_items )
            return attack_run

        except Exception:
            db.rollback()
            failed_run = db.query(AttackRun).filter(
                AttackRun.id == attack_run.id
            ).first()

            if failed_run:
                failed_run.status = "failed"
                failed_run.completed_at = datetime.utcnow()
                db.commit()
            raise
        
    def evaluate_scenarios_background(self, attack_run_id, model_type, collected_items):
        db = SessionLocal()
        try:
            evaluator_model = get_model("judge")
            evaluator = ScenarioEvaluator(evaluator_model)
            include_improvement = model_type == "user"

            results = db.query(AttackResult).filter(
                AttackResult.attack_run_id == attack_run_id
            ).all()

            response_map = {
                item["scenario_id"]: item
                for item in collected_items
            }

            for result in results:
                item = response_map.get(result.scenario_id)
                if not item:
                    result.passed = None
                    result.risk_score = None
                    result.evaluation_reason = "Original model response was not found for evaluation."
                    result.response_safe_to_show = False
                    result.model_response = "[hidden]"
                    db.commit()
                    continue

                scenario = db.query(Scenario).filter(
                    Scenario.scenario_code == result.scenario_id
                ).first()

                judge_item = {
                    "attack_type": result.attack_type,
                    "severity": result.severity,
                    "prompt": scenario.prompt if scenario else item.get("prompt"),
                    "expected_behavior": scenario.expected_behavior if scenario else item.get("expected_behavior"),
                    "model_response": item["model_response"]
                }
                try:
                    evaluation = evaluator.evaluate_one(
                        judge_item,
                        include_improvement=include_improvement
                    )

                    response_safe_to_show = (
                        evaluation.get("response_safe_to_show", False)
                        and evaluation.get("passed", False)
                    )
                    unsafe_categories = evaluation.get("unsafe_categories", [])

                    if isinstance(unsafe_categories, list):
                        unsafe_categories = ",".join(unsafe_categories)

                    result.model_response = (
                        item["model_response"]
                        if response_safe_to_show
                        else "[hidden]"
                    )
                    result.passed = evaluation.get("passed")
                    result.risk_score = evaluation.get("risk_score")
                    result.evaluation_reason = evaluation.get(
                        "reason",
                        "No evaluation reason returned."
                    )
                    result.improvement = evaluation.get("improvement")
                    result.response_safe_to_show = response_safe_to_show
                    result.evidence_summary = evaluation.get("evidence_summary")
                    result.unsafe_categories = unsafe_categories
                
                except Exception as error:
                    result.model_response = "[hidden]"
                    result.passed = None
                    result.risk_score = None
                    result.evaluation_reason = f"Scenario evaluation failed: {str(error)}"
                    result.improvement = None
                    result.response_safe_to_show = False
                    result.evidence_summary = None
                    result.unsafe_categories = None
            
                db.commit()

        finally:
            db.close()


    def get_attack_run_by_id(self, db, attack_run_id):
        return db.query(AttackRun).filter(
            AttackRun.id == attack_run_id
        ).first()

    def get_attack_runs_by_user_id(self, db, user_id):
        return db.query(AttackRun).filter(
            AttackRun.user_id == user_id
        ).all()