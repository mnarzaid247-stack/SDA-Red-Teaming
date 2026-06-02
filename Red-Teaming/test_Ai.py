from app.models.model_factory import get_model
from app.attacks.scenarios import Scenarios
from app.Results.resultCollector import ResultCollector
import time
import random 

model = get_model("llama")


scenario_library = Scenarios()
scenarios = random.sample(scenario_library.get_scenarios(), 10)


collector = ResultCollector()

for scenario in scenarios:

    print("Sending:", scenario["category"])
     
     
    response = model.generate(
        scenario["prompt"]
    )
    time.sleep(5)
    collector.add_result(
        model_name="llama",
        category=scenario["category"],
        prompt=scenario["prompt"],
        response=response
    )



results = collector.get_results()



for result in results:

    print("\n========================")
    print("MODEL:", result["model"])
    print("CATEGORY:", result["category"])

    if "timestamp" in result:
        print("TIME:", result["timestamp"])

    print("========================")

    print("\nPROMPT:")
    print(result["prompt"])

    print("\nRESPONSE:")
    print(result["response"])

    print("\n" + "=" * 50)