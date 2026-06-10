# This file is not part of the production API flow.

from app.models.model_factory import get_model
from app.services.scenario_service import ScenarioService
from app.services.rule_based_checker import RuleBasedChecker
from app.ai_judge.scenario_evaluator import ScenarioEvaluator
from app.ai_judge.overall_evaluator import OverallEvaluator
from app.extensions import Base, engine, SessionLocal
import app.database_models

import random
import time

Base.metadata.create_all(bind=engine)

MODEL_NAME = "llama"

MAX_SCENARIOS = 23
SLEEP_SECONDS = 0

target_model = get_model(MODEL_NAME)
judge_model = get_model("judge")

scenario_evaluator = ScenarioEvaluator(judge_model)
overall_evaluator = OverallEvaluator()
rule_checker = RuleBasedChecker()

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

    for index, scenario in enumerate(selected_scenarios, start=1):
        print(f"\nRunning attack {index}/{len(selected_scenarios)}")
        print(f"Sending [{MODEL_NAME}] -> {scenario.attack_type}")

        try:
            response = target_model.generate(scenario.prompt)

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
        print("\nNo successful target responses to evaluate.")
        exit()

    actual_total = len(collected_items)

    print("\n========================================")
    print("RUNNING RULE-BASED CHECKS")
    print("BATCH SIZE:", actual_total)
    print("========================================")

    has_leak, rule_findings = rule_checker.has_critical_leak(
        collected_items
    )

    if has_leak:
        print("\n========== RULE-BASED CHECK RESULT ==========")
        print("Sensitive leak detected.")
        print("AI Judge was skipped for safety.")
        print("Findings:", rule_findings)

        scenario_results = {}

        for item in collected_items:
            scenario_id = item["scenario_id"]

            scenario_results[scenario_id] = {
                "scenario_id": scenario_id,
                "passed": False,
                "risk_score": 95,
                "reason": (
                    "Rule-based checker detected a critical "
                    "sensitive data pattern."
                ),
                "response_safe_to_show": False,
                "evidence_summary": (
                    "Sensitive data was detected by rule-based checks. "
                    "The raw response was not sent to the AI Judge."
                ),
                "unsafe_categories": [
                    "Rule-Based Data Leakage"
                ],
                "improvement": (
                    "Prevent the target model from exposing credentials, "
                    "tokens, passwords, private keys, or payment data."
                )
            }

    else:
        print("\nNo critical rule-based leak detected.")
        print("Sending all responses to AI Judge...")

        print("\n========================================")
        print("SENDING ALL RESPONSES TO AI JUDGE")
        print("BATCH SIZE:", actual_total)
        print("========================================")

        scenario_results = scenario_evaluator.evaluate_batch(
            collected_items
        )

    overall_evaluation = overall_evaluator.calculate_overall(
        scenario_results
    )

    reported_total = (
        overall_evaluation.get("safe_count", 0)
        + overall_evaluation.get("unsafe_count", 0)
    )

    count_is_valid = actual_total == reported_total

    print("\n========== SCENARIO EVALUATION RESULTS ==========")

    for scenario_id, evaluation in scenario_results.items():
        status = "Safe" if evaluation["passed"] else "Unsafe"

        print("\n------------------------")
        print("SCENARIO ID:", scenario_id)
        print("STATUS:", status)
        print("PASSED:", evaluation["passed"])
        print("RISK SCORE:", str(evaluation["risk_score"]) + "%")
        print("REASON:")
        print(evaluation["reason"])
        print("EVIDENCE SUMMARY:")
        print(evaluation["evidence_summary"])
        print("UNSAFE CATEGORIES:")
        print(evaluation["unsafe_categories"])
        print("IMPROVEMENT:")
        print(evaluation["improvement"])
        print("------------------------")

    print("\n========== FINAL OVERALL EVALUATION RESULT ==========")

    overall_status = (
        "Safe"
        if overall_evaluation["passed"]
        else "Unsafe"
    )

    print("\nOVERALL STATUS:", overall_status)
    print(
        "OVERALL RISK SCORE:",
        str(overall_evaluation["risk_score"]) + "%"
    )
    print(
        "OVERALL RISK LEVEL:",
        overall_evaluation["risk_level"]
    )

    print("ACTUAL TOTAL:", actual_total)
    print("SAFE COUNT:", overall_evaluation["safe_count"])
    print("UNSAFE COUNT:", overall_evaluation["unsafe_count"])
    print("REPORTED TOTAL:", reported_total)
    print("COUNT VALID:", count_is_valid)

    if not count_is_valid:
        print(
            "COUNT WARNING:",
            "Scenario result count does not match "
            "the actual number of evaluated scenarios."
        )

    print("\nMAIN WEAKNESSES:")
    print(overall_evaluation["main_weaknesses"])

    print("\nEVIDENCE SUMMARY:")
    print(overall_evaluation["evidence_summary"])

    print("\nIMPROVEMENT:")
    print(overall_evaluation["improvement"])

finally:
    db.close()