from openai import OpenAI
from app.models.base_model import BaseModel


class GroqModel(BaseModel):

    def __init__(self, api_key, model_name):
        self.client = OpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1"
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
            max_tokens=500,
            temperature=0.2
        )

        return response.choices[0].message.content
# GroqModel connects to Groq's OpenAI-compatible API.
# Used for fast target model execution such as Llama and GPT-OSS.