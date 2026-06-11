from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.schemas.scenario_schema import AttackType



class AttackRunRequest(BaseModel):
    model_type: str
    selected_attack_types: List[AttackType]
    endpoint_url: Optional[str] = None
    api_key: Optional[str] = None


class AttackRunResponse(BaseModel):
    attack_run_id: str
    model_provider: str
    model_name: str
    selected_attack_types: str
    status: str
    passed: bool
    created_at: datetime
    duration_seconds: int | None = None
    overall_risk_score: Optional[int] = None
    overall_risk_level: Optional[str] = None
    overall_evidence_summary: Optional[str] = None
    overall_improvement: Optional[str] = None


class AttackResultResponse(BaseModel):
    
    id: str
    attack_type: str
    scenario_id: str
    severity: str
    model_response: Optional[str]
    passed: Optional[bool] = None
    risk_score: Optional[int] | None = None
    evaluation_reason: Optional[str]
    improvement: Optional[str]
    response_safe_to_show: bool
    evidence_summary: Optional[str]
    unsafe_categories: Optional[str]

    class Config:
        from_attributes = True


class AttackRunDetailsResponse(BaseModel):
    id: str
    user_id: str
    model_provider: str
    model_name: str
    selected_attack_types: str
    status: str
    created_at: datetime
    completed_at: Optional[datetime]
    duration_seconds: Optional[int]
    overall_passed: Optional[bool] = None
    overall_risk_score: Optional[int] = None
    overall_risk_level: Optional[str] = None
    overall_total_count: Optional[int] = None
    overall_safe_count: Optional[int] = None
    overall_unsafe_count: Optional[int] = None
    overall_evidence_summary: Optional[str] = None
    overall_improvement: Optional[str] = None
    results: List[AttackResultResponse]


    class Config:
        from_attributes = True