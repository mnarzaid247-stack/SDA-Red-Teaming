from app.extensions import SessionLocal
from app.individuals.services.scenario_service import ScenarioService


def seed_database():
    db = SessionLocal()

    try:
        ScenarioService().seed_scenarios(db)

    finally:
        db.close()