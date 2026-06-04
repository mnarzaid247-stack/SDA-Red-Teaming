from openai import OpenAI
from app.models.base_model import BaseModel

# GroqModel connects to Groq's OpenAI-compatible API to run Llama remotely
class GroqModel(BaseModel):

    def __init__(
            self,
            api_key,
            model_name="llama-3.3-70b-versatile"
    ):
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
            ]
        )

        return response.choices[0].message.content