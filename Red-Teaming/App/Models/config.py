from dotenv import load_dotenv
import os
load_dotenv () # تقرأ .env محتواه وتحمل للبرنامج 
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


# باختصار الشرح مثل خذ قيمة GEMINI_API_KEY من ملف .env وخزنها داخل متغير