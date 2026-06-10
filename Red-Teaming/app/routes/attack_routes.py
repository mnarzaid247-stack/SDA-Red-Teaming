from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.schemas.attack_schema import (AttackRunRequest, AttackRunResponse, AttackRunDetailsResponse)
from app.services.attack_service import AttackService
from app.extensions import get_db
from app.dependencies.auth_dependencies import get_current_user


router = APIRouter(
    prefix="/attacks",
    tags=["Attacks"]
)

attack_service = AttackService()


@router.post("/run", response_model=AttackRunResponse)
def run_attack(
    request: AttackRunRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    attack_run = attack_service.run_attack(
        db=db,
        user_id=current_user.id,
        model_type=request.model_type,
        selected_attack_types=request.selected_attack_types,
        endpoint_url=request.endpoint_url,
        api_key=request.api_key,
        background_tasks=background_tasks
    )

    return AttackRunResponse(
        attack_run_id=attack_run.id,
        model_provider=attack_run.model_provider,
        model_name=attack_run.model_name,
        selected_attack_types=attack_run.selected_attack_types,
        status=attack_run.status,
        passed=attack_run.overall_passed or False,
        created_at=attack_run.created_at,
        duration_seconds=attack_run.duration_seconds,
        overall_risk_score=attack_run.overall_risk_score,
        overall_risk_level=attack_run.overall_risk_level,
        overall_evidence_summary=attack_run.overall_evidence_summary,
        overall_improvement=attack_run.overall_improvement
    )

@router.get("/me", response_model=list[AttackRunDetailsResponse])
def get_my_attack_runs(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return attack_service.get_attack_runs_by_user_id(
        db,
        current_user.id
    )

@router.get(
    "/{attack_run_id}",
    response_model=AttackRunDetailsResponse
)
def get_attack_run(
    attack_run_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
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
    
    if attack_run.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Not allowed to access this attack run"
        )

    return attack_run
