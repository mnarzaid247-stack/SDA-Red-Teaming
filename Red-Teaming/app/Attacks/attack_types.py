# sample_attacks.py

"""
هذا الملف يحتوي على تعريف (أنواع الهجمات) فقط.

الفكرة:
نخلي أسماء الهجمات في مكان واحد.
باقي الملفات (scenarios, scoring, engine) تستخدم نفس الأسماء.
لو أضفنا هجوم جديد، نعدّل هنا فقط.

ملاحظة:
باقي الفريق (باك إند / فرونت إند) ما يحتاج يلمسه.
"""

class AttackTypes:

    """
    هذا الكلاس يحتوي أسماء الهجمات بشكل ثابت.
    نستخدمها كمفاتيح (keys) في باقي النظام.
    """

    PROMPT_INJECTION = "Prompt Injection"      # هجوم التلاعب بالتعليمات
    JAILBREAK = "Jailbreak"                    # هجوم كسر القيود
    DATA_LEAKAGE = "Data Leakage"              # هجوم تسريب البيانات
    TOXICITY = "Toxicity"                      # هجوم المحتوى الضار
    HALLUCINATION = "Hallucination"            # هجوم الهلوسة

# قائمة الهجمات المتاحة في النظام
ATTACKS = [
    AttackTypes.PROMPT_INJECTION,
    AttackTypes.JAILBREAK,
    AttackTypes.DATA_LEAKAGE,
    AttackTypes.TOXICITY,
    AttackTypes.HALLUCINATION
]

    # لو بغيت اضيف هجمات جديدة لاحقاً:
    # MODEL_EXTRACTION = "Model Extraction"
    # ROLEPLAY_ABUSE = "Roleplay Abuse"
