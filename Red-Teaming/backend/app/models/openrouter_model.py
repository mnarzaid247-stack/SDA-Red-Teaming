from openai import OpenAI
from app.models.base_model import BaseModel
from app.models.config import OPENROUTER_API_KEY


class OpenRouterModel(BaseModel):

    def __init__(self, model_name):
        if not OPENROUTER_API_KEY:
            raise RuntimeError("OPENROUTER_API_KEY is missing from environment variables")
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=OPENROUTER_API_KEY
        )
        self.model_name = model_name

    def generate(self, prompt):

        response = self.client.chat.completions.create(
            model=self.model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=2500,
            temperature=0.2
        )

        return response.choices[0].message.content
    

# OpenRouterModel connects to OpenRouter's unified API.
# Used for OpenRouter-hosted models such as Gemma and the AI Judge.