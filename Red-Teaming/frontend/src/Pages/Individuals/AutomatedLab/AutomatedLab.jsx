/**
 * [ architectural concept ]: Automated Assessment Lab Wizard Controller.
 * [ purpose ]: Manages a multi-step execution pipeline (Wizard) for automated AI security evaluations.
 * Orchestrates step-by-step state transitions from target model selection up to attack configuration and final report generation.
 */
import React, { useState } from 'react';
import ModelSelection from '../../../Components/Individuals/Labs/ModelSelection.jsx';
import AttackSelection from '../../../Components/Individuals/Labs/AttackSelection.jsx';
import AssessmentReview from './AssessmentReview';
import WizardHeader from '../../../Components/Individuals/Labs/WizardHeader.jsx';
import StepContainer from '../../../Components/Individuals/Labs/StepContainer.jsx';

const AutomatedLab = () => {
  // 3. CORE WIZARD STATES: Tracks the active step index and accumulated configuration metrics
  const [activeStep, setActiveStep] = useState(1);
  const [selections, setSelections] = useState({
    model: null,
    attacks: []
  });

  // 4. STEP 1 LOGIC (MODEL): Captures selected model and automatically advances pipeline to step 2
  const handleModelSelect = (model) => {
    setSelections((prev) => ({
      ...prev,
      model
    }));
    setActiveStep(2);
  };

  // 5. STEP 2 LOGIC (ATTACKS): Syncs selected vectors and forwards or rolls back steps based on asset count
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

  // 6. VALIDATION METRIC: Ensures both a target model and at least one threat vector are defined
  const canLaunch = selections.model && selections.attacks.length > 0;

  return (
    // 7. LAB VIEWPORT: Responsive layout framework utilizing native animation tokens
    <div className="max-w-6xl mx-auto pb-24 animate-in fade-in duration-700">

      {/* HEADER SECTION */}
      <WizardHeader
        title="Automated Assessment Lab"
        description="You can configure and launch AI security evaluations to get automated reports."
      />

      {/* MULTI-STEP PIPELINE WRAPPER */}
      <div className="mt-12 space-y-0">

        {/* STEP 1: TARGET CONFIGURATION */}
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

        {/* STEP 2: THREAT VECTOR CONFIGURATION */}
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

        {/* STEP 3: LABORATORY SUMMARY & EXECUTION TRIGGER */}
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
              // Triggered upon successful simulation execution run
              console.log('Attack completed:', data);
            }}
            onViewReport={(report) => {
              // Forwards the wizard to the final output screen layout (Step 4)
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