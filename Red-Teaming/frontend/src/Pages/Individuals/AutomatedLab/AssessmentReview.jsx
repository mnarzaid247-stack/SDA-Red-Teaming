import React, { useState, useMemo } from 'react';
import { runAttack } from "../../../API/attackAPI.js";

const STEPS = [
'Initializing model',
'Generating adversarial prompts',
'Executing attack scenarios',
'Evaluating model responses'
];

const AssessmentReview = ({ selections = {}, onRun, onViewReport }) => {
// استخدام useMemo لتجنب إعادة الحساب في كل Render
const model = selections?.model;
const attacks = useMemo(() => selections?.attacks || [], [selections?.attacks]);

// إدارة الـ State بشكل منظم
const [status, setStatus] = useState({
running: false,
completed: false,
progress: 0,
error: null
});
const [summary, setSummary] = useState(null);
const [attackRunId, setAttackRunId] = useState(null);

// دالة لمحاكاة تقدم الخطوات أثناء تشغيل الـ API
const simulateProgress = async (stopCondition) => {
for (let i = 0; i < STEPS.length; i++) {
if (stopCondition.current) break;
setStatus(prev => ({ ...prev, progress: i }));
await new Promise((resolve) => setTimeout(resolve, 800));
}
};

const handleRun = async () => {
if (!model) {
setStatus(prev => ({ ...prev, error: "الرجاء اختيار النموذج أولاً (No model selected)." }));
return;
}
if (attacks.length === 0) {
setStatus(prev => ({ ...prev, error: "الرجاء اختيار هجوم واحد على الأقل (No attacks selected)." }));
return;
}

// إعادة تهيئة الـ State لبدء الفحص
setStatus({ running: true, completed: false, progress: 0, error: null });
setSummary(null);

// مرجع لإيقاف المحاكاة في حال حدوث خطأ في الـ API
const isCancelled = { current: false };
simulateProgress(isCancelled);

try {
// تنظيف ومعالجة النصوص لتحويل الشرطة الوسطى لسفلية لتطابق الـ Swagger Schema المتوقعة في الباك إند
const formattedAttacks = attacks
.map(a => {
const id = typeof a === 'string' ? a : a?.id;
return id ? id.replace(/-/g, '_') : null;
})
.filter(Boolean);

const payload = {
model_type: model?.id || model?.name,
selected_attack_types: formattedAttacks,
endpoint_url: model?.endpoint_url || null,
api_key: model?.api_key || null
};

const data = await runAttack(payload);

// التأكد من وصول العداد لآخر خطوة بعد نجاح الـ API
setStatus(prev => ({ ...prev, progress: STEPS.length - 1 }));
setSummary(data);
setAttackRunId(data.attack_run_id || data.id);
setStatus(prev => ({ ...prev, completed: true }));
onRun?.(data);
} 
catch (err) {
isCancelled.current = true; // إيقاف العداد
const errorMsg = err?.response?.data?.message || err?.message || "An unexpected error occurred";
setStatus(prev => ({ ...prev, error: errorMsg }));
} finally {
setStatus(prev => ({ ...prev, running: false }));
}
};

return (
<section className="relative rounded-3xl border border-outline-variant bg-surface-container p-10 overflow-hidden">
{/* الخلفية الجمالية */}
<div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
<div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

{/* الهيدر وزر التشغيل (يختفي الزر عند اكتمال العملية) */}
<div className="flex justify-between items-start">
<h2 className="text-display-sm font-black text-on-surface">
Red Team Assessment
</h2>

{!status.completed && (
<button
onClick={handleRun}
disabled={status.running}
className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
status.running
? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
: 'bg-primary text-on-primary hover:scale-[1.02] hover:shadow-lg'
}`}
>
{status.running ? 'Running simulation...' : 'Run Attack'}
</button>
)}
</div>

{/* عرض الأخطاء */}
{status.error && (
<div className="mt-6 p-4 bg-error/10 border border-error/20 text-error rounded-xl text-sm">
{status.error}
</div>
)}

{/* خطوات الفحص الفعلي */}
<div className="mt-10 space-y-3">
{STEPS.map((step, i) => {
const isPast = i < status.progress;
const isCurrent = i === status.progress && status.running;
return (
<div
key={step}
className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
isPast ? 'bg-primary/10 border-primary/25' :
isCurrent ? 'bg-primary/5 border-primary/40 animate-pulse' :
'bg-surface-container-low border-outline-variant opacity-50'
}`}
>
<div className={`w-2 h-2 rounded-full ${isPast || isCurrent ? 'bg-primary' : 'bg-on-surface-variant/40'}`} />
<p className="text-sm font-medium text-on-surface-variant">{step}</p>
</div>
);
})}
</div>

{/* ملخص النتيجة عند الاكتمال مضاف إليه النص البديل للزر */}
{status.completed && summary && (
<div className="mt-10 text-center space-y-6 animate-fadeIn">
<div className={`text-5xl font-black ${summary.passed ? 'text-success' : 'text-error'}`}>
{summary.passed ? 'SAFE' : 'RISK DETECTED'}
</div>

<div className="text-on-surface-variant text-sm">
Duration: <span className="font-bold">{summary.duration_seconds}s</span>
</div>

{/* النص البديل للأزرار بعد النجاح */}
<div className="text-primary font-bold text-lg border border-primary/20 bg-primary/5 py-4 px-6 rounded-2xl animate-pulse">
Success! Proceed to the reports page to view the results.
</div>
</div>
)}
</section>
);
};

export default AssessmentReview;
