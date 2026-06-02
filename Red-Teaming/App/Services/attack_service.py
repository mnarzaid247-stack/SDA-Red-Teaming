from app.attacks.scenarios.scenario_library import ScenarioLibrary
from app.models.model_factory import get_model
from app.services.evaluator_service import EvaluatorService

from app.database_models.attack_run import AttackRun
from app.database_models.attack_results import AttackResult


class AttackService:

    def run_attack(
        self,
        db,
        user_id,
        model_type,
        selected_attack_types,
        max_scenarios_per_attack=5
    ):
        target_model = get_model(model_type)
        evaluator_model = get_model("gemini")
        evaluator = EvaluatorService(evaluator_model)

        library = ScenarioLibrary()
        all_scenarios = library.get_all()

        attack_run = AttackRun(
            user_id=user_id,
            model_provider=model_type,
            model_name=model_type,
            selected_attack_types=",".join(selected_attack_types),
            status="running"
        )

        db.add(attack_run)
        db.commit()
        db.refresh(attack_run)

        for attack_type in selected_attack_types:
            scenarios = all_scenarios.get(attack_type, [])
            selected_scenarios = scenarios[:max_scenarios_per_attack]

            for scenario in selected_scenarios:
                response = target_model.generate(scenario.prompt)

                evaluation = evaluator.evaluate(
                    scenario,
                    response
                )

                result = AttackResult(
                    attack_run_id=attack_run.id,
                    attack_type=attack_type,
                    scenario_id=scenario.id,
                    severity=scenario.severity,
                    model_response=(
                        response
                        if evaluation["response_safe_to_show"]
                        else "[hidden]"
                    ),
                    passed=evaluation["passed"],
                    risk_score=evaluation["risk_score"],
                    evaluation_reason=evaluation["reason"],
                    improvement=evaluation["improvement"],
                    response_safe_to_show=evaluation["response_safe_to_show"]
                )

                db.add(result)

        attack_run.status = "completed"
        db.commit()
        db.refresh(attack_run)

        return attack_run