from pydantic import BaseModel
from typing import Optional
from enum import Enum
from pydantic import Field


class AttackType(str, Enum):
    prompt_injection = "prompt_injection"
    jailbreak = "jailbreak"
    toxicity = "toxicity"
    data_leakage = "data_leakage"
    hallucination = "hallucination"
    tool_misuse = "tool_misuse"

class ScenarioCreate(BaseModel):
    attack_type: AttackType
    prompt: str
    expected_behavior: str = Field(min_length=1)
    severity: str = Field(min_length=1)


class ScenarioUpdate(BaseModel):
    attack_type: Optional[AttackType] = None
    prompt: Optional[str] = None
    expected_behavior: Optional[str] = None
    severity: Optional[str] = None


class ScenarioResponse(BaseModel):
    id: str
    attack_type: str
    prompt: str
    expected_behavior: str
    severity: str
    scenario_code: str

    class Config:
        from_attributes = True