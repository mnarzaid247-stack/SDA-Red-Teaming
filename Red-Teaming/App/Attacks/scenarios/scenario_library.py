from typing import Dict, List

from app.attacks.attack_types import AttackTypes

from app.attacks.scenarios.scenario_model import Scenario
from app.attacks.scenarios.prompt_injection import PROMPT_INJECTION_SCENARIOS
from app.attacks.scenarios.jailbreak import JAILBREAK_SCENARIOS
from app.attacks.scenarios.data_leakage import DATA_LEAKAGE_SCENARIOS
from app.attacks.scenarios.toxicity import TOXICITY_SCENARIOS
from app.attacks.scenarios.hallucination import HALLUCINATION_SCENARIOS


class ScenarioLibrary:

    def __init__(self):
        self.scenarios: Dict[str, List[Scenario]] = {
            AttackTypes.PROMPT_INJECTION: PROMPT_INJECTION_SCENARIOS,
            AttackTypes.JAILBREAK: JAILBREAK_SCENARIOS,
            AttackTypes.DATA_LEAKAGE: DATA_LEAKAGE_SCENARIOS,
            AttackTypes.TOXICITY: TOXICITY_SCENARIOS,
            AttackTypes.HALLUCINATION: HALLUCINATION_SCENARIOS,
        }

    def get_all(self):
        return self.scenarios