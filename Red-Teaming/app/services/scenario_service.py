from app.database_models.scenario import Scenario
from app.attacks.scenarios.scenario_library import ScenarioLibrary

class ScenarioService:

    def generate_scenario_code(self, db, attack_type):
        attack_type = (
            attack_type.value
            if hasattr(attack_type, "value")
            else attack_type
        )
        prefix_map = {
            "prompt_injection": "PI",
            "jailbreak": "JB",
            "toxicity": "TX",
            "data_leakage": "DL",
            "hallucination": "HL"
        }

        if attack_type not in prefix_map:
            raise ValueError("Unsupported attack type")

        prefix = prefix_map[attack_type]

        existing_codes = db.query(Scenario.scenario_code).filter(
            Scenario.scenario_code.like(f"{prefix}-%")
        ).all()

        max_number = 0

        for code_tuple in existing_codes:
            code = code_tuple[0]

            try:
                number = int(code.split("-")[1])
                if number > max_number:
                    max_number = number
            except (IndexError, ValueError):
                continue

        return f"{prefix}-{max_number + 1:03}"


    def create_scenario(self, db, scenario_data):
        scenario_code = self.generate_scenario_code(
            db,
            scenario_data.attack_type
        )

        scenario = Scenario(
            scenario_code=scenario_code,
            attack_type=scenario_data.attack_type,
            prompt=scenario_data.prompt,
            expected_behavior=scenario_data.expected_behavior,
            severity=scenario_data.severity
        )

        db.add(scenario)
        db.commit()
        db.refresh(scenario)

        return scenario

    def get_all_scenarios(self, db):
        return db.query(Scenario).all()

    def get_scenario_by_id(self, db, scenario_id):
        return db.query(Scenario).filter(
            Scenario.id == scenario_id
        ).first()

    def get_scenarios_by_attack_type(self, db, attack_type):
        attack_type = (
            attack_type.value
            if hasattr(attack_type, "value")
            else attack_type
        )
        return db.query(Scenario).filter(
            Scenario.attack_type == attack_type
        ).all()

    def update_scenario(self, db, scenario_id, scenario_data):
        scenario = self.get_scenario_by_id(db, scenario_id)

        if not scenario:
            return None

        update_data = scenario_data.model_dump(exclude_unset=True)

        if "attack_type" in update_data:
            new_attack_type = update_data["attack_type"]

            if hasattr(new_attack_type, "value"):
                new_attack_type = new_attack_type.value

            if new_attack_type != scenario.attack_type:
                scenario.scenario_code = self.generate_scenario_code(
                    db,
                    new_attack_type
                )

            scenario.attack_type = new_attack_type
            update_data.pop("attack_type")

        for key, value in update_data.items():
            setattr(scenario, key, value)

        db.commit()
        db.refresh(scenario)

        return scenario

    def delete_scenario(self, db, scenario_id):
        scenario = self.get_scenario_by_id(db, scenario_id)

        if not scenario:
            return None

        db.delete(scenario)
        db.commit()

        return scenario

    def seed_scenarios(self, db):
        library = ScenarioLibrary()
        all_scenarios = library.get_all()

        for attack_type, scenarios in all_scenarios.items():
            for scenario in scenarios:

                exists = db.query(Scenario).filter(
                    Scenario.scenario_code == scenario.id
                ).first()

                if exists:
                    continue

                new_scenario = Scenario(
                    scenario_code=scenario.id,
                    attack_type=attack_type,
                    prompt=scenario.prompt,
                    expected_behavior=scenario.expected_behavior,
                    severity=scenario.severity
                )

                db.add(new_scenario)

        db.commit()