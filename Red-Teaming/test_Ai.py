from app.models.model_factory import get_model
from app.services.scenario_service import ScenarioService
from app.extensions import Base, engine, SessionLocal
import app.database_models

import random
import time

Base.metadata.create_all(bind=engine)

MODEL_NAME = "gpt"

model = get_model(MODEL_NAME)

db = SessionLocal()

scenario_service = ScenarioService()

try:

    scenarios = scenario_service.get_all_scenarios(db)

    if len(scenarios) == 0:
        print("No scenarios found.")
        exit()

    selected_scenarios = random.sample(
        scenarios,
        min(20, len(scenarios))
    )

    for index, scenario in enumerate(selected_scenarios, start=1):

        print(f"\nRunning attack {index}/{len(selected_scenarios)}")
        print(f"Sending [{MODEL_NAME}] -> {scenario.attack_type}")

        try:

            response = model.generate(
                scenario.prompt
            )

            print("\n========================")
            print("MODEL:", MODEL_NAME)
            print("CATEGORY:", scenario.attack_type)
            print("SEVERITY:", scenario.severity)

            print("\nPROMPT:")
            print(scenario.prompt)

            print("\nRESPONSE:")
            print(response)

            print("\nSTATUS: Success")
            print("=" * 50)

        except Exception as error:

            print("\nSTATUS: Failed")
            print("ERROR:", error)
            print("=" * 50)

        time.sleep(3)

finally:
    db.close()

    