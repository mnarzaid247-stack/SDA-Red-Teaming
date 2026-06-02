from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.attack_schema import (
    AttackRunRequest,
    AttackRunResponse
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
        user_id="temp-user-id",
        model_type=request.model_type,
        selected_attack_types=request.selected_attack_types,
        max_scenarios_per_attack=request.max_scenarios_per_attack
    )

    return AttackRunResponse(
        attack_run_id=attack_run.id,
        status=attack_run.status
    )