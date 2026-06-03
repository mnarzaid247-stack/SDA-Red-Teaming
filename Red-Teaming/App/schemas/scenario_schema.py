from pydantic import BaseModel
from typing import Optional


class ScenarioCreate(BaseModel):
    attack_type: str
    prompt: str
    expected_behavior: str
    severity: str
    scenario_code: str


class ScenarioUpdate(BaseModel):
    attack_type: Optional[str] = None
    prompt: Optional[str] = None
    expected_behavior: Optional[str] = None
    severity: Optional[str] = None
    scenario_code: str


class ScenarioResponse(BaseModel):
    id: str
    attack_type: str
    prompt: str
    expected_behavior: str
    severity: str
    scenario_code: str

    class Config:
        from_attributes = True