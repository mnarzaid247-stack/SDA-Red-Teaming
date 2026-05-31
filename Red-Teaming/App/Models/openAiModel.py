from openai import OpenAI
from App.Models.BaseModel import BaseModel


class OpenAIModel(BaseModel):

    def __init__(self, api_key, model_name="gpt-4o-mini"):
        self.client = OpenAI(api_key=api_key)
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

        return response.choices[0].message.content # سطر خاص بمكتبة OpenAI لأنها ترجع object كبير ف احنا ناخذ اول رد [0]