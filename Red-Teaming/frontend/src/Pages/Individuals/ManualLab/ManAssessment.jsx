import React, { useState, useMemo } from 'react';
import { runManualAttack } from '../../../API/attackAPI.js'; 

const SIMULATION_STEPS = [
'Initializing target model environment',
'Analyzing custom adversarial prompt payload',
'Executing sandboxed attack scenarios',
'Evaluating behavioral model outputs'
];

const ATTACK_KEYWORDS = {
'prompt-injection': [
'ignore previous instructions',
'system prompt override',
'jailbreak system rules'
],
'jailbreak': [
'act as unrestricted AI',
'developer mode enabled',
'bypass safety filters'
],
'data-leakage': [
'reveal hidden data',
'show system prompt',
'expose internal config'
],
'unsafe-output': [
'generate harmful content',
'unsafe response',
'toxic output test'
],
'hallucination': [
'make up facts',
'invent sources',
'confident wrong answer'
]
};

const ManAssessment = ({ selections = {}, onRun }) => {
const { model, attacks = [] } = selections;

// إدارات الحالات الداخلية للمكون بنقاء
const [prompt, setPrompt] = useState('');
const [isRunning, setIsRunning] = useState(false);
const [executionProgress, setExecutionProgress] = useState(0);
const [isCompleted, setIsCompleted] = useState(false);
const [attackSummary, setAttackSummary] = useState(null);

// استخراج نوع الهجوم الحالي بأمان وعزل الكلمات المفتاحية عبر الـ useMemo لتحسين الأداء
const currentAttackType = attacks[0] || null;
const filteredKeywords = useMemo(() => {
if (!currentAttackType) return [];
return ATTACK_KEYWORDS[currentAttackType] || [];
}, [currentAttackType]);

// دالة تشغيل الهجوم اليدوي وإدارة محاكاة الـ Pipeline التتابعية
const handleAttackExecution = async () => {
const cleanPrompt = prompt.trim();
if (!model || !currentAttackType || !cleanPrompt) return;

setIsRunning(true);
setExecutionProgress(0);
setIsCompleted(false);
setAttackSummary(null);

// تحويل صيغة النص من الفرونت إند (شرطة وسطى) إلى صيغة الباك إند (شرطة سفلية) لتجنب الـ Server Crash
const formattedAttackType = currentAttackType.replace(/-/g, '_');

try {
// إرسال البيانات للباك إند على مسار الهجوم اليدوي المخصص لـ ManualAttackRequest مطابقاً للـ Swagger Schema
const responseData = await runManualAttack({
model_type: model?.id || model?.name,
attack_type: formattedAttackType,
prompt: cleanPrompt,
endpoint_url: model?.endpoint_url || null,
api_key: model?.api_key || null
});

// تشغيل الـ Pipeline البصرية المحاكية لخطوات الفحص الأمني
for (let index = 0; index < SIMULATION_STEPS.length; index++) {
setExecutionProgress(index);
await new Promise((resolve) => setTimeout(resolve, 650));
}

setAttackSummary(responseData);
setIsCompleted(true);

// إشعار المكون الرئيسي باكتمال المهمة بنجاح وتمرير البيانات مباشرة دون جلب تقرير إضافي
onRun?.(responseData);

} catch (error) {
console.error('Manual Red-Teaming execution encountered an error:', error);
} finally {
setIsRunning(false);
}
};

// شروط حظر الزر مجمعة في متغير منطقي مقروء ونظيف للواجهة
const isSubmissionDisabled = isRunning || !model || !currentAttackType || !prompt.trim();

return (
<section className="relative rounded-3xl border border-outline-variant bg-surface-container p-10 overflow-hidden w-full">
{/* الخلفية الجمالية المتوهجة (Blur Glow Effects) */}
<div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
<div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

{/* HEADER SECTION */}
<div className="flex flex-col sm:flex-row justify-between items-start gap-4 z-10 relative">
<div>
<h2 className="text-display-sm font-black text-on-surface">
Manual Attack Lab
</h2>
<p className="text-sm text-on-surface-variant mt-1">
Inject tailored adversarial payloads directly to evaluate prompt vulnerability.
</p>
</div>

{/* يختفي زر التشغيل العلوي تلقائياً عند اكتمال العملية بنجاح لتوجيه نظر المستخدم للأسفل */}
{!isCompleted && (
<button
type="button"
onClick={handleAttackExecution}
disabled={isSubmissionDisabled}
className={`
px-8 py-4 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap text-sm
${isSubmissionDisabled
? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-50'
: 'bg-primary text-on-primary hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
}
`}
>
{isRunning ? 'Running Security Evaluation...' : 'Run Attack'}
</button>
)}
</div>

{/* PAYLOAD TEXTAREA INPUT */}
<div className="mt-8 z-10 relative">
<label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold block mb-2">
Adversarial Payload Prompt
</label>
<textarea
value={prompt}
onChange={(e) => setPrompt(e.target.value)}
disabled={isRunning || isCompleted}
placeholder="Compose your custom injection payload or select from the pre-configured attack templates below..."
className="
w-full p-4 rounded-xl min-h-[130px]
bg-surface-container-low text-on-surface
border border-outline-variant focus:border-primary/50
text-sm outline-none font-mono transition-all resize-none
disabled:opacity-60 disabled:cursor-not-allowed
"
/>
</div>

{/* GUIDED ATTACK TEMPLATE KEYWORDS */}
{filteredKeywords.length > 0 && !isCompleted && (
<div className="mt-4 z-10 relative">
<span className="text-[11px] text-on-surface-variant block mb-2 uppercase tracking-wider font-semibold">
Suggested Vectors:
</span>
<div className="flex flex-wrap gap-2">
{filteredKeywords.map((word, index) => (
<button
key={index}
type="button"
disabled={isRunning}
onClick={() => setPrompt(word)}
className="
px-3 py-1.5 text-xs rounded-full border border-primary/20
bg-primary/5 text-primary font-medium transition-all duration-200
hover:bg-primary/20 disabled:opacity-40 disabled:cursor-not-allowed
"
>
{word}
</button>
))}
</div>
</div>
)}

{/* VISUAL EXECUTION PIPELINE */}
<div className="mt-10 space-y-3 z-10 relative">
{SIMULATION_STEPS.map((step, index) => {
const isPassed = index < executionProgress;
const isCurrent = index === executionProgress && isRunning;
return (
<div
key={step}
className={`
flex items-center gap-3 p-4 rounded-xl border transition-all duration-300
${isPassed ? 'bg-primary/10 border-primary/20 text-primary' : ''}
${isCurrent ? 'bg-primary/5 border-primary/40 animate-pulse text-on-surface' : ''}
${!isPassed && !isCurrent ? 'bg-surface-container-low border-outline-variant text-on-surface-variant' : ''}
`}
>
<div className={`
w-2 h-2 rounded-full transition-all duration-300
${isPassed || isCurrent ? 'bg-primary' : 'bg-outline-variant'}
${isCurrent ? 'scale-125' : ''}
`} />
<p className="text-sm font-medium">{step}</p>
</div>
);
})}
</div>

{/* REAL-TIME ASSESSMENT RESULTS */}
{isCompleted && attackSummary && (
<div className="mt-10 text-center space-y-6 p-6 rounded-2xl bg-surface-container-high border border-outline-variant/50 animate-fade-in z-10 relative">
<div className="space-y-1">
<span className="text-xs uppercase tracking-widest text-on-surface-variant block">
Firewall Evaluator Verdict
</span>
<div className={`text-4xl font-black tracking-wider ${attackSummary.passed ? 'text-primary' : 'text-error'}`}>
{attackSummary.passed ? 'SAFE' : 'RISK DETECTED'}
</div>
</div>

<div className="text-sm text-on-surface-variant font-mono">
Analysis Duration: <span className="text-on-surface font-bold">{attackSummary.duration_seconds || 0}s</span>
</div>

{/* النص الإنجليزي البديل لزر التقرير بعد انتهاء الفحص بنجاح */}
<div className="text-primary font-bold text-base border border-primary/20 bg-primary/5 py-4 px-6 rounded-2xl animate-pulse">
Success! Proceed to the reports page to view the results.
</div>
</div>
)}
</section>
);
};

export default ManAssessment;
