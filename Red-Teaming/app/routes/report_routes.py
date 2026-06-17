from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.extensions import get_db
from app.dependencies.auth_dependencies import get_current_user
from app.services.attack_service import AttackService
from app.schemas.report_schema import (
    ReportCardResponse,
    ReportDetailsResponse
)


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

attack_service = AttackService()


@router.get("", response_model=list[ReportCardResponse])
def get_report_cards(
    attack_type: str | None = Query(default=None),
    model_provider: str | None = Query(default=None),
    model_name: str | None = Query(default=None),
    risk_level: str | None = Query(default=None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return attack_service.get_report_cards(
        db=db,
        current_user=current_user,
        attack_type=attack_type,
        model_provider=model_provider,
        model_name=model_name,
        risk_level=risk_level
    )


@router.get("/{attack_run_id}", response_model=ReportDetailsResponse, response_model_exclude_none=True)
def get_my_report_details(
    attack_run_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    report = attack_service.get_attack_run_by_id(
        db,
        attack_run_id
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    if report.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not allowed to access this report"
        )

    return  ReportDetailsResponse(
    id=report.id,
    model_provider=report.model_provider,
    model_name=report.model_name,
    selected_attack_types=report.selected_attack_types,
    status=report.status,
    created_at=report.created_at,
    completed_at=report.completed_at,
    duration_seconds=report.duration_seconds,
    overall_passed=report.overall_passed,
    overall_risk_score=report.overall_risk_score,
    overall_risk_level=report.overall_risk_level,
    detected_risks=report.overall_unsafe_count,
    overall_evidence_summary=report.overall_evidence_summary,
    overall_improvement=report.overall_improvement
)