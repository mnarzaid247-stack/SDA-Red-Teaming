# test_Ai.py
from App.Attacks.scenarios import Scenarios
from App.Results.resultCollector import ResultCollector

# نلغي الموديل مؤقتًا
model = None

collector = ResultCollector()

# تحميل السيناريوهات
scenarios = Scenarios()
attack_scenarios = scenarios.get_scenarios()

for attack in attack_scenarios:

    prompt = attack["prompt"]

    # استجابة وهمية فقط للاختبار
    response = "TEST_RESPONSE_ONLY"

    collector.add_result(
        model_name="NO_MODEL",
        category=attack["category"],
        prompt=prompt,
        response=response
    )

# طباعة النتائج
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
