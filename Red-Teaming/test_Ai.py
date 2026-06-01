from App.Models.modelFactory import get_model
from App.Attacks.sample_attacks import ATTACKS
from App.Results.resultCollector import ResultCollector

model = get_model(
    "gemini"
)

collector = ResultCollector()

for attack in ATTACKS:

    prompt = attack["prompt"]

    response = model.generate(
        prompt
    )

    collector.add_result(
        model_name="gemini",
        category=attack["category"],
        prompt=prompt,
        response=response
    )

results = collector.get_results()

for result in results:

    print("\n========================")
    print("MODEL:", result["model"])
    print("CATEGORY:", result["category"])
    print("========================")

    print("PROMPT:")
    print(result["prompt"])

    print("\nRESPONSE:")
    print(result["response"])