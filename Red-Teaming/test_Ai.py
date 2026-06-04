from app.models.model_factory import get_model
from app.Services.scenario_service import ScenarioService
from app.extensions import SessionLocal

import time
import random


MODEL_NAME = "llama"

model = get_model(MODEL_NAME)

db = SessionLocal()

scenario_service = ScenarioService()

try:
    scenarios = scenario_service.get_all_scenarios(db)

    if len(scenarios) == 0:
        scenario_service.seed_scenarios(db)
        scenarios = scenario_service.get_all_scenarios(db)

    selected_scenarios = random.sample(
        scenarios,
        min(10, len(scenarios))
    )

    for scenario in selected_scenarios:

        print(f"Sending [{MODEL_NAME}] -> {scenario.attack_type}")

        response = model.generate(
            scenario.prompt
        )
        #save_response(..)
        print("\n========================")
        print("MODEL:", MODEL_NAME)
        print("CATEGORY:", scenario.attack_type)
        print("SEVERITY:", scenario.severity)

        print("\nPROMPT:")
        print(scenario.prompt)

        print("\nRESPONSE:")
        print(response)

        print("\n" + "=" * 50)

        time.sleep(5)

finally:
    db.close()

    