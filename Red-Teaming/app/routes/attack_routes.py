from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.schemas.attack_schema import (AttackRunRequest, AttackRunResponse, AttackRunDetailsResponse, AdminAttackRunSummaryResponse)
from app.services.attack_service import AttackService
from app.extensions import get_db
from app.dependencies.auth_dependencies import get_current_user, get_current_admin


router = APIRouter(
    prefix="/attacks",
    tags=["Attacks"]
)

attack_service = AttackService()


@router.post("/run", response_model=AttackRunResponse, response_model_exclude_none=True)
def run_attack(
    request: AttackRunRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        attack_run = attack_service.run_attack(
            db=db,
            user_id=current_user.id,
            model_type=request.model_type.value,
            selected_attack_types=request.selected_attack_types,
            endpoint_url=request.endpoint_url,
            api_key=request.api_key,
            background_tasks=background_tasks
        )
    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )
    except RuntimeError as error:
        raise HTTPException(
            status_code=429,
            detail=str(error)
        )
    
    return AttackRunResponse(
        model_provider=attack_run.model_provider,
        model_name=attack_run.model_name,
        selected_attack_types=[
            item.strip()
            for item in attack_run.selected_attack_types.split(",")
            if item.strip()],
        status=attack_run.status,
        passed=attack_run.overall_passed,
        created_at=attack_run.created_at,
        duration_seconds=attack_run.duration_seconds,
        overall_results=attack_run.overall_results
    )

@router.get(
    "",
    response_model=list[AdminAttackRunSummaryResponse]
)
def get_all_attack_runs(
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    return attack_service.get_all_attack_runs(db)

@router.get(
    "/{attack_run_id}",
    response_model=AttackRunDetailsResponse
)
def get_attack_run(
    attack_run_id: str,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)):
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
