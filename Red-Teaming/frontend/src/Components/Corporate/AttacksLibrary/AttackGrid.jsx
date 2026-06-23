import React from 'react';
import AttackCard from './AttackCard.jsx';

const ATTACK_CATEGORIES = [
  {
    name: 'Prompt Injection',
    category: 'Input Manipulation',
    risk: 'CRITICAL RISK',
    riskLevel: 'critical',
    description: 'Direct or indirect manipulation of LLM input to override system...',
    whyItMatters: 'Can bypass safety filters, steal sensitive data, or compromise the entire application logic flow.',
    coverage: 98,
    scenarios: 50,
    icon: 'psychology'
  },
  {
    name: 'Jailbreak',
    category: 'Model Integrity',
    risk: 'CRITICAL RISK',
    riskLevel: 'critical',
    description: 'Adversarial attacks designed to disable the LLM\'s safety guardrai...',
    whyItMatters: 'Enables the generation of harmful, illegal, or unethical content by bypassing core safety alignments.',
    coverage: 84,
    scenarios: 50,
    icon: 'lock_open'
  },
  {
    name: 'Data Leakage',
    category: 'Privacy',
    risk: 'HIGH RISK',
    riskLevel: 'high',
    description: 'Extraction of private training data, PII, or internal secrets via...',
    whyItMatters: 'Causes severe regulatory compliance violations and loss of proprietary business secrets.',
    coverage: 91,
    scenarios: 50,
    icon: 'database'
  },
  {
    name: 'toxicity',
    category: 'Model Integrity',
    risk: 'MEDIUM RISK',
    riskLevel: 'medium',
    description: 'The accidental generation of offensive, biased, or sexually...',
    whyItMatters: 'Damage brand reputation and violates safety policies through unfiltered model responses.',
    coverage: 76,
    scenarios: 50,
    icon: 'warning',
    status: 'medium'
  },
  {
    name: 'Hallucination',
    category: 'Model Integrity',
    risk: 'MEDIUM RISK',
    riskLevel: 'medium',
    description: 'The model confidently presenting false, nonsensical, or fabricated...',
    whyItMatters: 'Undermines user trust and can lead to dangerous real-world decisions based on false info.',
    coverage: 94,
    scenarios: 50,
    icon: 'bubble_chart'
  },
  {
  name: 'Tool Misuse',
  category: 'Model Integrity',
  risk: 'HIGH RISK',
  riskLevel: 'high',
  description: 'The model being manipulated into hijacking connected applications, executing unauthorized function calls, or bypassing constraints on external tools.',
  whyItMatters: 'Allows attackers to turn a secure AI model into a weaponized agent that destroys database tables, leaks confidential user records, or triggers malicious code.',
  coverage: 91,
  scenarios: 50,
  icon: 'build' 
}
];

const AttackGrid = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ATTACK_CATEGORIES.map((attack) => (
        <AttackCard key={attack.name} {...attack} />
      ))}
    </section>
  );
};

export default AttackGrid;