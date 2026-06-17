from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.auth_dependencies import get_current_admin
from app.extensions import get_db
from app.services.scenario_service import ScenarioService
from app.schemas.scenario_schema import (
    ScenarioCreate,
    ScenarioUpdate,
    ScenarioResponse,
    AttackType
)


router = APIRouter(
    prefix="/scenarios",
    tags=["Scenarios"]
)

scenario_service = ScenarioService()


@router.post("", response_model=ScenarioResponse, status_code=201)
def create_scenario(
    scenario_data: ScenarioCreate,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    return scenario_service.create_scenario(
        db,
        scenario_data
    )


@router.get("", response_model=list[ScenarioResponse])
def get_scenarios(
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    return scenario_service.get_all_scenarios(db)

@router.get("/type/{attack_type}", response_model=list[ScenarioResponse])
def get_scenarios_by_attack_type(
    attack_type: AttackType,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    return scenario_service.get_scenarios_by_attack_type(
        db,
        attack_type
    )


@router.get("/{scenario_id}", response_model=ScenarioResponse)
def get_scenario(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    scenario = scenario_service.get_scenario_by_id(
        db,
        scenario_id
    )

    if not scenario:
        raise HTTPException(
            status_code=404,
            detail="Scenario not found"
        )

    return scenario


@router.put("/{scenario_id}", response_model=ScenarioResponse)
def update_scenario(
    scenario_id: str,
    scenario_data: ScenarioUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    scenario = scenario_service.update_scenario(
        db,
        scenario_id,
        scenario_data
    )

    if not scenario:
        raise HTTPException(
            status_code=404,
            detail="Scenario not found"
        )

    return scenario


@router.delete("/{scenario_id}")
def delete_scenario(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    scenario = scenario_service.delete_scenario(
        db,
        scenario_id
    )

    if not scenario:
        raise HTTPException(
            status_code=404,
            detail="Scenario not found"
        )

    return {
        "message": "Scenario deleted successfully"
    }