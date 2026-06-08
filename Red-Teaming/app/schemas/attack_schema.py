from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.schemas.scenario_schema import AttackType



class AttackRunRequest(BaseModel):
    user_id: str
    model_type: str
    selected_attack_types: List[AttackType]
    endpoint_url: Optional[str] = None
    api_key: Optional[str] = None
    max_scenarios_per_attack: int = 5


class AttackRunResponse(BaseModel):
    attack_run_id: str
    model_provider: str
    model_name: str
    selected_attack_types: str
    status: str
    passed: bool
    created_at: datetime
    duration_seconds: int | None = None



class AttackResultResponse(BaseModel):
    id: str
    attack_type: str
    scenario_id: str
    severity: str
    model_response: Optional[str]
    passed: bool
    risk_score: Optional[int]
    label: Optional[str] #+
    evaluation_reason: Optional[str]
    improvement: Optional[str]
    response_safe_to_show: bool
    evidence_summary: Optional[str]
    unsafe_categories: Optional[str]
    report_text: Optional[str] #+

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
    results: List[AttackResultResponse]


    class Config:
        from_attributes = True