from App.Models.ollamaModel import OllamaModel
from App.Attacks.sample_attacks import ATTACKS

model = OllamaModel()

for attack in ATTACKS:

    print("\n========================")
    print("Category:", attack["category"])
    print("========================")

    prompt = attack["prompt"]

    response = model.generate(prompt)

    print("\nPrompt:")
    print(prompt)

    print("\nResponse:")
    print(response)

    print("\n")