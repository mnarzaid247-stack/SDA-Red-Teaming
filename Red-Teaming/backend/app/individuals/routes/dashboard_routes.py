from app.extensions import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.individuals.database_models.attack_run import AttackRun
from datetime import datetime
from app.individuals.database_models.attack_results import AttackResult
from app.individuals.schemas.dashboard_schema import AttackRiskDistributionItem, TotalScenarioCountResponse, LastAttackRunResponse, SecurityTrendItem


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/attack-risk-distribution",
    response_model=list[AttackRiskDistributionItem]
)
def get_attack_risk_distribution(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            AttackResult.attack_type,
            func.count(AttackResult.id).label("successful_scenarios")
        )
        .filter(AttackResult.passed == False)
        .group_by(AttackResult.attack_type)
        .all()
    )

    total_successful = sum(row.successful_scenarios for row in results)

    if total_successful == 0:
        return []

    return [
        AttackRiskDistributionItem(
            attack_type=row.attack_type,
            successful_scenarios=row.successful_scenarios,
            percentage=round((row.successful_scenarios / total_successful) * 100, 2)
        )
        for row in results
    ]


@router.get(
    "/total-scenarios",
    response_model=TotalScenarioCountResponse
)
def get_total_scenarios(
    db: Session = Depends(get_db)
):
    total = db.query(AttackResult).count()

    return TotalScenarioCountResponse(
        total_scenarios=total
    )


@router.get(
    "/last-attack",
    response_model=LastAttackRunResponse
)
def get_last_attack(
    db: Session = Depends(get_db)
):
    last_attack = (
        db.query(AttackRun)
        .order_by(AttackRun.created_at.desc())
        .first()
    )

    if not last_attack:
        return LastAttackRunResponse(
            last_attack_at=None,
            message="No attacks yet"
        )

    now = datetime.utcnow()
    diff = now - last_attack.created_at

    minutes = int(diff.total_seconds() // 60)
    hours = int(diff.total_seconds() // 3600)
    days = diff.days

    if minutes < 1:
        message = "Just now"
    elif minutes < 60:
        message = f"{minutes} minutes ago"
    elif hours < 24:
        message = f"{hours} hours ago"
    elif days < 30:
        message = f"{days} days ago"
    elif days < 365:
        months = days // 30
        message = f"{months} months ago"
    else:
        years = days // 365
        message = f"{years} years ago"

    return LastAttackRunResponse(
        last_attack_at=last_attack.created_at,
        message=message
    )

@router.get(
    "/security-trend",
    response_model=list[SecurityTrendItem]
)
def get_security_trend(
    db: Session = Depends(get_db)
):
    last_runs = (
        db.query(AttackRun)
        .order_by(AttackRun.created_at.desc())
        .limit(10)
        .all()
    )

    last_runs = list(reversed(last_runs))

    trend = []

    attack_number = 1

    for run in last_runs:
        safe_count = (
            db.query(AttackResult)
            .filter(
                AttackResult.attack_run_id == run.id,
                AttackResult.passed == True
            )
            .count()
        )

        unsafe_count = (
            db.query(AttackResult)
            .filter(
                AttackResult.attack_run_id == run.id,
                AttackResult.passed == False
            )
            .count()
        )
        total_count = safe_count + unsafe_count

        if total_count == 0:
            continue

        trend.append(
            SecurityTrendItem(
                attack_number=attack_number,
                safe_scenarios=safe_count,
                unsafe_scenarios=unsafe_count,
                total_scenarios=safe_count + unsafe_count
            )
        )
        attack_number += 1

    return trend