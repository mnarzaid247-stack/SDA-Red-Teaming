from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.attack_schema import (
    AttackRunRequest,
    AttackRunResponse,
    AttackRunDetailsResponse
)
from app.services.attack_service import AttackService
from app.extensions import get_db


router = APIRouter(
    prefix="/attacks",
    tags=["Attacks"]
)

attack_service = AttackService()


@router.post(
    "/run",
    response_model=AttackRunResponse
)
def run_attack(
    request: AttackRunRequest,
    db: Session = Depends(get_db)
):
    attack_run = attack_service.run_attack(
        db=db,
        user_id=request.user_id,
        model_type=request.model_type,
        selected_attack_types=request.selected_attack_types,
        max_scenarios_per_attack=request.max_scenarios_per_attack,
        endpoint_url=request.endpoint_url,
        api_key=request.api_key
    )

    return AttackRunResponse(
        attack_run_id=attack_run.id,
        status=attack_run.status,
        created_at=attack_run.created_at,
        duration_seconds=attack_run.duration_seconds
    )


@router.get(
    "/{attack_run_id}",
    response_model=AttackRunDetailsResponse
)
def get_attack_run(
    attack_run_id: str,
    db: Session = Depends(get_db)
):
    attack_run = attack_service.get_attack_run_by_id(
        db,
        attack_run_id
    )

    if not attack_run:
        raise HTTPException(
            status_code=404,
            detail="Attack run not found"
        )

    return attack_run


@router.get(
    "/user/{user_id}",
    response_model=list[AttackRunDetailsResponse]
)
def get_user_attack_runs(
    user_id: str,
    db: Session = Depends(get_db)
):
    return attack_service.get_attack_runs_by_user_id(
        db,
        user_id
    )