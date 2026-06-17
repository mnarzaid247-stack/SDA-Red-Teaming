"""
Central place for collecting all attack scenarios.

Each attack type has its own file, and this library simply groups them so the
engine can access everything from one location. Keeping this mapping here makes
the system easier to maintain and extend.
"""



from typing import Dict, List

from app.attacks.attack_types import AttackTypes

from app.attacks.scenarios.scenario_model import Scenario
from app.attacks.scenarios.prompt_injection import PROMPT_INJECTION_SCENARIOS
from app.attacks.scenarios.jailbreak import JAILBREAK_SCENARIOS
from app.attacks.scenarios.data_leakage import DATA_LEAKAGE_SCENARIOS
from app.attacks.scenarios.toxicity import TOXICITY_SCENARIOS
from app.attacks.scenarios.hallucination import HALLUCINATION_SCENARIOS


class ScenarioLibrary:

# Load all scenarios grouped by attack type.
# This keeps the structure clean and avoids importing scenarios individually
# throughout the codebase.

    def __init__(self):

# Dictionary mapping each attack type to its corresponding scenario list.
# The keys come from AttackTypes, ensuring consistent naming across the system.

        self.scenarios: Dict[str, List[Scenario]] = {
            AttackTypes.PROMPT_INJECTION: PROMPT_INJECTION_SCENARIOS,
            AttackTypes.JAILBREAK: JAILBREAK_SCENARIOS,
            AttackTypes.DATA_LEAKAGE: DATA_LEAKAGE_SCENARIOS,
            AttackTypes.TOXICITY: TOXICITY_SCENARIOS,
            AttackTypes.HALLUCINATION: HALLUCINATION_SCENARIOS,
        }




# Return the full scenario mapping.
# Useful when the engine needs to iterate over all attacks and their scenarios.


    def get_all(self):
        return self.scenarios