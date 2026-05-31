import google.generativeai as genai

from App.Models.BaseModel import BaseModel


class GeminiModel(BaseModel):

    def __init__(self, api_key, model_name="gemini-2.5-flash"):

        genai.configure(api_key=api_key)

        self.model = genai.GenerativeModel(
            model_name
        )

    def generate(self, prompt):

        response = self.model.generate_content(
            prompt
        )

        return response.text