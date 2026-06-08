# This file is not part of the production API flow.

from app.models.model_factory import get_model
from app.services.scenario_service import ScenarioService
from app.services.evaluator_service import EvaluatorService
from app.extensions import Base, engine, SessionLocal
import app.database_models

import random
import time

Base.metadata.create_all(bind=engine)

MODEL_NAME = "llama"

MAX_SCENARIOS = 10
SLEEP_SECONDS = 2

target_model = get_model(MODEL_NAME)
judge_model = get_model("judge")

evaluator = EvaluatorService(judge_model)

db = SessionLocal()
scenario_service = ScenarioService()

try:

    scenarios = scenario_service.get_all_scenarios(db)

    if len(scenarios) == 0:
        print("No scenarios found.")
        exit()

    selected_scenarios = random.sample(
        scenarios,
        min(MAX_SCENARIOS, len(scenarios))
    )

    collected_items = []

    print("\n==============================")
    print("TARGET MODEL:", MODEL_NAME)
    print("TOTAL SCENARIOS:", len(selected_scenarios))
    print("==============================")

    print("\n========== TARGET MODEL RESPONSES ==========")

    for index, scenario in enumerate(
        selected_scenarios,
        start=1
    ):

        print(
            f"\nRunning attack {index}/{len(selected_scenarios)}"
        )
        print(
            f"Sending [{MODEL_NAME}] -> {scenario.attack_type}"
        )

        try:

            response = target_model.generate(
                scenario.prompt
            )

            collected_items.append({
                "scenario_id": scenario.scenario_code,
                "attack_type": scenario.attack_type,
                "severity": scenario.severity,
                "prompt": scenario.prompt,
                "expected_behavior": scenario.expected_behavior,
                "model_response": response
            })

            print("\n------------------------")
            print("SCENARIO ID:", scenario.scenario_code)
            print("CATEGORY:", scenario.attack_type)
            print("ATTACK SEVERITY:", scenario.severity)

            print("\nPROMPT:")
            print(scenario.prompt)

            print("\nTARGET MODEL RESPONSE:")
            print(response)

            print("\nTARGET STATUS: Success")
            print("------------------------")

        except Exception as error:

            print("\nTARGET STATUS: Failed")
            print("ERROR:", error)

        time.sleep(SLEEP_SECONDS)

    if len(collected_items) == 0:
        print(
            "\nNo successful target responses to evaluate."
        )
        exit()

    print("\n========================================")
    print("SENDING ALL RESPONSES TO AI JUDGE")
    print("BATCH SIZE:", len(collected_items))
    print("========================================")

    overall_evaluation = (
        evaluator.evaluate_overall_batch(
            collected_items
        )
    )

    print(
        "\n========== FINAL OVERALL AI JUDGE RESULT =========="
    )

    print(
        "\nOVERALL LABEL:",
        overall_evaluation["label"]
    )

    print(
        "OVERALL RISK SCORE:",
        str(overall_evaluation["risk_score"]) + "%"
    )

    print(
        "OVERALL RISK LEVEL:",
        overall_evaluation["risk_level"]
    )

    print(
        "SAFE COUNT:",
        overall_evaluation["safe_count"]
    )

    print(
        "UNSAFE COUNT:",
        overall_evaluation["unsafe_count"]
    )

    print("\nMAIN WEAKNESSES:")
    print(
        overall_evaluation["main_weaknesses"]
    )

    print("\nREASON:")
    print(
        overall_evaluation["reason"]
    )

    print("\nEVIDENCE SUMMARY:")
    print(
        overall_evaluation["evidence_summary"]
    )

    print("\nUNSAFE CATEGORIES:")
    print(
        overall_evaluation["unsafe_categories"]
    )

    print("\nIMPROVEMENT:")
    print(
        overall_evaluation["improvement"]
    )

    print("\nFULL REPORT:")
    print(
        overall_evaluation["report_text"]
    )

finally:
    db.close()