from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from typing import Optional, List
from app.schemas.attack_schema import AttackOverallResultResponse


class ReportCardResponse(BaseModel):
    id: str
    selected_attack_types: str
    created_at: datetime
    overall_risk_score: Optional[int] = None
    overall_risk_level: Optional[str] = None


class ReportDetailsResponse(BaseModel):
    id: str
    model_provider: str
    model_name: str
    selected_attack_types: str
    status: str
    created_at: datetime
    completed_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    overall_passed: Optional[bool] = None
    overall_risk_score: Optional[int] = None
    overall_risk_level: Optional[str] = None
    detected_risks: int | None = None
    overall_evidence_summary: Optional[str] = None
    overall_improvement: Optional[str] = None
    overall_results: List[AttackOverallResultResponse] = []