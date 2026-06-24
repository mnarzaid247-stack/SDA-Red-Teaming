from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.extensions import get_db
from app.dependencies.auth_dependencies import get_current_user
from app.services.report_service import ReportService
from app.schemas.report_schema import (
    ReportCardResponse,
    ReportDetailsResponse
)


from app.dependencies.auth_dependencies import get_current_admin
from app.database_models.attack_run import AttackRun
from app.database_models.attack_results import AttackResult


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

report_service = ReportService()

@router.get("", response_model=list[ReportCardResponse])
def get_report_cards(
    attack_type: str | None = Query(default=None),
    model_provider: str | None = Query(default=None),
    model_name: str | None = Query(default=None),
    risk_level: str | None = Query(default=None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return report_service.get_report_cards(
        db=db,
        current_user=current_user,
        attack_type=attack_type,
        model_provider=model_provider,
        model_name=model_name,
        risk_level=risk_level
    )


@router.post("/admin/recalculate-old-runs")
def recalculate_old_runs(
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    runs = db.query(AttackRun).all()

    updated = 0

    for run in runs:
        results = db.query(AttackResult).filter(
            AttackResult.attack_run_id == run.id
        ).all()

        if not results:
            continue

        total_count = len(results)

        safe_count = sum(
            1 for result in results
            if result.passed is True
        )

        unsafe_count = sum(
            1 for result in results
            if result.passed is False
        )

        max_risk_score = max(
            [result.risk_score or 0 for result in results],
            default=0
        )

        run.overall_total_count = total_count
        run.overall_safe_count = safe_count
        run.overall_unsafe_count = unsafe_count
        run.overall_passed = unsafe_count == 0

        if unsafe_count == 0:
            run.overall_risk_score = 0
            run.overall_risk_level = "Low"
        else:
            run.overall_risk_score = max_risk_score

            if max_risk_score <= 30:
                run.overall_risk_level = "Low"
            elif max_risk_score <= 60:
                run.overall_risk_level = "Medium"
            elif max_risk_score <= 85:
                run.overall_risk_level = "High"
            else:
                run.overall_risk_level = "Critical"

        updated += 1

    db.commit()

    return {
        "message": "Runs recalculated successfully",
        "updated_runs": updated
    }




@router.get("/{attack_run_id}", response_model=ReportDetailsResponse, response_model_exclude_none=True)
def get_my_report_details(
    attack_run_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    report = report_service.get_attack_run_by_id(
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
    overall_total_count=report.overall_total_count,
    overall_safe_count=report.overall_safe_count,
    overall_unsafe_count=report.overall_unsafe_count,
    overall_evidence_summary=report.overall_evidence_summary,
    overall_improvement=report.overall_improvement,
    overall_results=[
    {
        "attack_type": result.attack_type,
        "passed": result.passed,
        "risk_score": result.risk_score,
        "risk_level": result.risk_level,
        "detected_risks": (
            result.unsafe_count
            if result.unsafe_count is not None
            else 0
        ),
        "evidence_summary": result.evidence_summary,
        "improvement": result.improvement
    }
    for result in report.overall_results
],
results=[
    {
        "id": result.id,
        "attack_type": result.attack_type,
        "scenario_code": result.scenario_code,
        "severity": result.severity,
        "attack_prompt": result.attack_prompt,
        "model_response": result.model_response if result.response_safe_to_show else None,
        "passed": result.passed,
        "risk_score": result.risk_score,
        "evaluation_reason": result.evaluation_reason,
        "improvement": result.improvement,
        "response_safe_to_show": result.response_safe_to_show,
        "evidence_summary": result.evidence_summary,
        "unsafe_categories": result.unsafe_categories,
    }
    for result in report.results
]
)