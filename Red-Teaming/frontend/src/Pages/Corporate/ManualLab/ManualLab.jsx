import React, { useState } from 'react';
import WizardHeader from '../../../Components/Corporate/Labs/WizardHeader.jsx';
import StepContainer from '../../../Components/Corporate/Labs/StepContainer.jsx';
import ModelSelection from '../../../Components/Corporate/Labs/ModelSelection.jsx';
import AttackSelection from '../../../Components/Corporate/Labs/AttackSelection.jsx';
import ManAssessment from './ManAssessment.jsx';

const ManualLab = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selections, setSelections] = useState({
    model: null,
    attacks: [] // مصفوفة تحمل أنواع الهجمات المختارة
  });
  
  // State إضافي لمتابعة ما إذا تم تنفيذ هجوم يدوي واحد على الأقل بنجاح
  const [hasExecuted, setHasExecuted] = useState(false);

  // الخيار الأول: تحديد النموذج المستهدف وفك قفل الخطوة التالية تلقائياً
  const handleModelSelect = (selectedModel) => {
    setSelections((prev) => ({
      ...prev,
      model: selectedModel
    }));
    setActiveStep(2);
  };

  // الخيار الثاني: إدارة هجمات الـ Red Teaming المحددة وتحديث حالة معالج الخطوات
  const handleAttackSelect = (updatedAttacks) => {
    setSelections((prev) => ({
      ...prev,
      attacks: updatedAttacks
    }));

    // الانتقال للخطوة الثالثة والأخيرة فقط في حال وجود هجوم نشط واحد على الأقل
    if (updatedAttacks.length > 0) {
      setActiveStep(3);
    } else {
      setActiveStep(2);
    }
  };

  // التحقق من اكتمال الشروط الأمنية الأساسية لتفعيل منصة الهجوم اليدوي
  const isLabReady = selections.model && selections.attacks.length > 0;

  return (
    <div className="max-w-6xl mx-auto pb-24 animate-in fade-in duration-700 w-full">
      
      {/* الـ Header الرئيسي للمختبر اليدوي */}
      <WizardHeader 
        title="Manual Assessment Lab"
        description="Test model security manually by selecting attacks and writing custom prompts using guided keywords."
      />

      <div className="mt-12 space-y-0">

        {/* الخطوة الأولى: اختيار الـ LLM المراد اختباره ريج تيمينج */}
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

        {/* الخطوة الثانية: اختيار نوع الثغرة الأمنية المراد توليد الـ Payload لها */}
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

        {/* الخطوة الثالثة: المختبر اليدوي (Manual Lab) وكتابة الـ Prompt الحقيقي */}
        <StepContainer 
          step={3} 
          title="Manual Prompt & Execution"
          isActive={activeStep === 3}
          isCompleted={hasExecuted} 
          isLocked={!isLabReady}
        >
          <ManAssessment 
            selections={selections}
            onRun={() => setHasExecuted(true)} // تظل الخطوة نشطة ومفتوحة لعرض لوحة النتائج وزر التقرير
            onViewReport={(reportData) => {
              // إذا كنتِ ترغبين في عمل تتبع إضافي عند فتح التقرير النهائي
              console.log("Reviewing manual payload insights:", reportData);
            }}
          />
        </StepContainer>

      </div>
    </div>
  );
};

export default ManualLab;