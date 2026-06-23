import React from 'react';

const ATTACK_CATEGORIES = [
  {
    id: 'prompt_injection',
    name: 'Prompt Injection',
    risk: 'Critical Risk',
    icon: 'terminal',
    desc: 'Attempts to override system instructions using malicious prompts.'
  },
  {
    id: 'jailbreak',
    name: 'Jailbreak',
    risk: 'Critical Risk',
    icon: 'lock_open',
    desc: 'Tries to bypass model safety rules and restrictions.'
  },
  {
    id: 'data_leakage',
    name: 'Data Leakage',
    risk: 'Medium Risk',
    icon: 'database',
    desc: 'Attempts to extract sensitive or hidden information.'
  },
  {
    id: 'toxicity',
    name: 'Toxicity',
    risk: 'Medium Risk',
    icon: 'warning',
    desc: 'Tests for harmful or toxic responses.'
  },
  {
    id: 'hallucination',
    name: 'Hallucination',
    risk: 'Medium Risk',
    icon: 'psychology',
    desc: 'Evaluates model accuracy and hallucination behavior.'
  },
  {
  id: 'tool_misuse',
  name: 'Tool Misuse',
  risk: 'High Risk',
  icon: 'construction', 
  desc: 'Evaluates model behavior against unauthorized API calls and tool manipulation.'
}
];

const AttackSelection = ({ selectedAttacks = [], onSelect }) => {
  const toggle = (id) => {
    const updated = selectedAttacks.includes(id)
      ? selectedAttacks.filter((x) => x !== id)
      : [...selectedAttacks, id];

    onSelect(updated);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {ATTACK_CATEGORIES.map((attack) => {
        const selected = selectedAttacks.includes(attack.id);

        return (
          <button
            key={attack.id}
            type="button"
            onClick={() => toggle(attack.id)}
            className={`
              text-left p-6 rounded-xl border transition-all
              bg-surface-container-low hover:bg-surface-container-high
              ${selected ? 'border-primary shadow-[0_0_0_1px_var(--color-primary)]' : 'border-outline-variant'}
            `}
          >
            <div className="flex justify-between mb-5">
              <span className="material-symbols-outlined text-3xl text-primary">
                {attack.icon}
              </span>

              <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center
                ${selected ? 'bg-primary border-primary' : 'border-outline-variant'}`}>
                {selected && <div className="w-2 h-2 bg-white" />}
              </div>
            </div>

            <h3 className="text-lg font-bold">{attack.name}</h3>
            <p className="text-sm text-gray-500 mt-2">{attack.desc}</p>

            <div className="mt-4 text-xs uppercase opacity-70">
              {attack.risk}
            </div>
          </button>
        );
      })}
    </section>
  );
};

export default AttackSelection;