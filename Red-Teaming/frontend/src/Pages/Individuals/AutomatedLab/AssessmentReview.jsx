/**
 * [ architectural concept ]: presentation component designed to manage and monitor autonomous red team deployment orchestrations.
 * [ purpose ]: renders real-time multi-stage process verification pipelines, encapsulates security payload transmissions, 
 * and provides definitive post-execution state indicators without arbitrary outcome grading.
 */

import React, { useState, useMemo } from 'react';
import { runAttack } from "../../../API/attackAPI.js";

const STEPS = [
  'Initializing model',
  'Generating adversarial prompts',
  'Executing attack scenarios',
  'Evaluating model responses'
];

const AssessmentReview = ({ selections = {}, onRun, onViewReport }) => {
  // 1. DATA CONFIG: localized structural caching utilizing useMemo to mitigate redundant rendering cycles
  const model = selections?.model;
  const attacks = useMemo(() => selections?.attacks || [], [selections?.attacks]);

  // 2. ORCHESTRATION STATE: centralized state mapping governing simulation lifecycle metrics
  const [status, setStatus] = useState({
    running: false,
    completed: false,
    progress: 0,
    error: null
  });
  const [summary, setSummary] = useState(null);
  const [attackRunId, setAttackRunId] = useState(null);

  // 3. SIMULATION CONTROLLER: async thread simulation to increment micro-step timeline visuals
  const simulateProgress = async (stopCondition) => {
    for (let i = 0; i < STEPS.length; i++) {
      if (stopCondition.current) break;
      setStatus(prev => ({ ...prev, progress: i }));
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  };

  // 4. ACTION HANDLER: core execution method mapping schema payloads to external orchestration endpoints
  const handleRun = async () => {
    if (!model) {
      setStatus(prev => ({ ...prev, error: "الرجاء اختيار النموذج أولاً (No model selected)." }));
      return;
    }
    if (attacks.length === 0) {
      setStatus(prev => ({ ...prev, error: "الرجاء اختيار هجوم واحد على الأقل (No attacks selected)." }));
      return;
    }

    setStatus({ running: true, completed: false, progress: 0, error: null });
    setSummary(null);

    const isCancelled = { current: false };
    simulateProgress(isCancelled);

    try {
      // Data normalization: replacing hyphens with underscores to adhere to structural API schema requirements
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

      setStatus(prev => ({ ...prev, progress: STEPS.length - 1 }));
      setSummary(data);
      setAttackRunId(data.attack_run_id || data.id);
      setStatus(prev => ({ ...prev, completed: true }));
      onRun?.(data);
    } 
    catch (err) {
      isCancelled.current = true;
      const errorMsg = err?.response?.data?.message || err?.message || "An unexpected error occurred";
      setStatus(prev => ({ ...prev, error: errorMsg }));
    } finally {
      setStatus(prev => ({ ...prev, running: false }));
    }
  };

  // 5. MAIN VIEWPORT RESOLUTION: localized interactive simulation card node
  return (
    <section className="relative rounded-3xl border border-outline-variant bg-surface-container p-10 overflow-hidden">
      
      {/* NODE: background aesthetic spatial gradient shapes */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      {/* NODE: structural orchestration header and core reactive trigger action button */}
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

      {/* NODE: runtime exception notification banner */}
      {status.error && (
        <div className="mt-6 p-4 bg-error/10 border border-error/20 text-error rounded-xl text-sm">
          {status.error}
        </div>
      )}

      {/* NODE: active assessment pipeline status timeline trackers */}
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
              <div className={`w-2 h-2 rounded-full ${isPast || i === status.progress ? 'bg-primary' : 'bg-on-surface-variant/40'}`} />
              <p className="text-sm font-medium text-on-surface-variant">{step}</p>
            </div>
          );
        })}
      </div>

      {/* NODE: definitive success validation container containing onward reporting navigation cues */}
      {status.completed && summary && (
  <div className="mt-10 space-y-6 animate-fadeIn">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-5">
        <p className="text-xs uppercase tracking-widest text-on-surface-variant">
          Overall Result
        </p>
        <h3 className={`mt-2 text-3xl font-black ${summary.passed ? 'text-success' : 'text-error'}`}>
          {summary.passed ? 'PASSED' : 'FAILED'}
        </h3>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-5">
        <p className="text-xs uppercase tracking-widest text-on-surface-variant">
          Overall Risk Score
        </p>
        <h3 className="mt-2 text-3xl font-black text-on-surface">
          {summary.overall_risk_score ?? 0}
        </h3>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-5">
        <p className="text-xs uppercase tracking-widest text-on-surface-variant">
          Duration
        </p>
        <h3 className="mt-2 text-3xl font-black text-on-surface">
          {summary.duration_seconds ?? 0}s
        </h3>
      </div>
    </div>

    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center">
      <p className="text-on-surface font-bold">
        Overall assessment completed.
      </p>
      <p className="text-on-surface-variant text-sm mt-2">
        To view results for each attack type, go to the Reports page.
      </p>
    </div>

  </div>
)}
    </section>
  );
};

export default AssessmentReview;