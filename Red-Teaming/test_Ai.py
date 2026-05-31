from App.Models.modelFactory import get_model

model = get_model(
    "gemini",
    api_key="GEMINI_API_KEY"
)

response = model.generate(
    "Introduce yourself"
)

print(response)