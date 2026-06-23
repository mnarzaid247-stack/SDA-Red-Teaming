# OpenRouter Model Integration
# ----------------------------------------------------------
# Provides a unified interface for interacting with models
# hosted on OpenRouter. This implementation allows the
# platform to use different OpenRouter-supported models
# through the common BaseModel interface.
# ==========================================================
from openai import OpenAI
from app.models.base_model import BaseModel
from app.models.config import OPENROUTER_API_KEY


# Implementation of the BaseModel interface using OpenRouter.
class OpenRouterModel(BaseModel):

# Initializes the OpenRouter client and stores the selected model name.
    def __init__(self, model_name):
        if not OPENROUTER_API_KEY:
            raise RuntimeError("OPENROUTER_API_KEY is missing from environment variables")
    
    # OpenRouter exposes an OpenAI-compatible API endpoint.
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=OPENROUTER_API_KEY
        )
        self.model_name = model_name


    # Sends the prompt to the selected OpenRouter model and returns the response.
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
    

