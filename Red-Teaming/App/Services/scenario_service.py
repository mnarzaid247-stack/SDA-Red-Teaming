from app.database_models.scenario import Scenario
from app.attacks.scenarios.scenario_library import ScenarioLibrary

class ScenarioService:

    def create_scenario(self, db, scenario_data):
        scenario = Scenario(
            scenario_code=scenario_data.scenario_code,
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
        return db.query(Scenario).filter(
            Scenario.attack_type == attack_type
        ).all()

    def update_scenario(self, db, scenario_id, scenario_data):
        scenario = self.get_scenario_by_id(db, scenario_id)

        if not scenario:
            return None

        if scenario_data.attack_type is not None:
            scenario.attack_type = scenario_data.attack_type

        if scenario_data.prompt is not None:
            scenario.prompt = scenario_data.prompt

        if scenario_data.expected_behavior is not None:
            scenario.expected_behavior = scenario_data.expected_behavior

        if scenario_data.severity is not None:
            scenario.severity = scenario_data.severity

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
    