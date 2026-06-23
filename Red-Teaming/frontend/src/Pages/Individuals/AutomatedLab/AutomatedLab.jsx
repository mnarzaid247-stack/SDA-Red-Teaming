import React from 'react';
import AssessmentReview from './AssessmentReview';
import WizardHeader from '../../../Components/Individuals/Labs/WizardHeader.jsx';
import StepContainer from '../../../Components/Individuals/Labs/StepContainer.jsx';
import ModelSelection from '../../../Components/Individuals/Labs/ModelSelection.jsx';
import AttackSelection from '../../../Components/Individuals/Labs/AttackSelection.jsx';

const AutomatedLab = () => {
const [activeStep, setActiveStep] = React.useState(1);

const [selections, setSelections] = React.useState({
model: null,
attacks: []
});

// MODEL
const handleModelSelect = (model) => {
setSelections((prev) => ({
...prev,
model
}));

setActiveStep(2);
};

// ATTACKS
const handleAttackSelect = (updatedAttacks) => {
setSelections((prev) => ({
...prev,
attacks: updatedAttacks
}));

if (updatedAttacks.length > 0) {
setActiveStep(3);
} else {
setActiveStep(2);
}
};

const canLaunch = selections.model && selections.attacks.length > 0;

return (
<div className="max-w-6xl mx-auto pb-24 animate-in fade-in duration-700">

<WizardHeader
title="Automated Assessment Lab"
description="You can configure and launch AI security evaluations to get automated reports."
/>

<div className="mt-12 space-y-0">

{/* STEP 1 */}
<StepContainer
step={1}
title="Target Model Selection"
isActive={activeStep === 1}
isCompleted={!!selections.model}
>
<ModelSelection
selectedModel={selections.model}
onSelect={handleModelSelect}
/>
</StepContainer>

{/* STEP 2 */}
<StepContainer
step={2}
title="Attack Selection"
isActive={activeStep === 2}
isCompleted={selections.attacks.length > 0}
isLocked={!selections.model}
>
<AttackSelection
selectedAttacks={selections.attacks}
onSelect={handleAttackSelect}
/>
</StepContainer>

{/* STEP 3 */}
<StepContainer
step={3}
title="Assessment Review"
isActive={activeStep === 3}
isCompleted={false}
isLocked={!canLaunch}
>
<AssessmentReview
selections={{
model: selections.model,
attacks: selections.attacks
}}
onRun={(data) => {
// بعد نجاح التشغيل
console.log('Attack completed:', data);
}}
onViewReport={(report) => {
console.log('Full report:', report);
setActiveStep(4);
}}
/>
</StepContainer>

</div>
</div>
);
};

export default AutomatedLab;