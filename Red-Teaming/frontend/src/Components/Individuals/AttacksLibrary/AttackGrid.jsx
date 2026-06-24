/**
 * [ architectural concept ]: structural layout layer designed for mass presentation of vector intelligence.
 * [ purpose ]: acts as a collection aggregator that maps static analytical definitions into distinct, 
 * independent presentation instances using responsive grid mechanics.
 */

import React from 'react';
import AttackCard from './AttackCard.jsx';

// 1. DATA CONFIG: static analytical dataset defining core model vulnerabilities and risk metrics
const ATTACK_CATEGORIES = [
  {
    name: 'Prompt Injection',
    attackType: 'prompt_injection',
    category: 'Input Manipulation',
    risk: 'CRITICAL RISK',
    riskLevel: 'critical',
    description: 'Attempts to manipulate model instructions through crafted inputs that override intended system behavior.',
    whyItMatters: 'Can bypass safety filters, steal sensitive data, or compromise the entire application logic flow.',
    Attack_Risk: 98,
    scenarios: 50,
    icon: 'psychology'
  },
  {
    name: 'Jailbreak',
    attackType: 'jailbreak',
    category: 'Model Integrity',
    risk: 'CRITICAL RISK',
    riskLevel: 'critical',
    description: 'Techniques designed to circumvent model safety mechanisms and operational restrictions.',
    whyItMatters: 'Enables the generation of harmful, illegal, or unethical content by bypassing core safety alignments.',
    Attack_Risk: 84,
    scenarios: 50,
    icon: 'lock_open'
  },
  {
    name: 'Data Leakage',
    attackType: 'data_leakage',
    category: 'Privacy',
    risk: 'HIGH RISK',
    riskLevel: 'high',
    description: 'Attempts to extract confidential information, sensitive records, or proprietary data from the model.',
    whyItMatters: 'Causes severe regulatory compliance violations and loss of proprietary business secrets.',
    Attack_Risk: 91,
    scenarios: 50,
    icon: 'database'
  },
  {
    name: 'toxicity',
    attackType: 'toxicity',
    category: 'Model Integrity',
    risk: 'MEDIUM RISK',
    riskLevel: 'medium',
    description: 'Evaluation of the model’s tendency to generate offensive, harmful, or inappropriate content.',
    whyItMatters: 'Damage brand reputation and violates safety policies through unfiltered model responses.',
    Attack_Risk: 76,
    scenarios: 50,
    icon: 'warning',
    status: 'medium'
  },
  {
    name: 'Hallucination',
    attackType: 'hallucination',
    category: 'Model Integrity',
    risk: 'MEDIUM RISK',
    riskLevel: 'medium',
    description: 'Assessment of inaccurate, fabricated, or misleading responses generated with high confidence.',
    whyItMatters: 'Undermines user trust and can lead to dangerous real-world decisions based on false info.',
    Attack_Risk: 94,
    scenarios: 50,
    icon: 'bubble_chart'
  },
  {
  name: 'Tool Misuse',
  attackType: 'tool_misuse',
  category: 'Model Integrity',
  risk: 'HIGH RISK',
  riskLevel: 'high',
  description: 'Testing whether the model can be manipulated into improper use of connected tools, APIs, or external systems.',
  whyItMatters: 'Allows attackers to turn a secure AI model into a weaponized agent that destroys database tables, leaks confidential user records, or triggers malicious code.',
  Attack_Risk: 91,
  scenarios: 50,
  icon: 'build' 
}
];

// 2. MAIN VIEWPORT RESOLUTION: responsive matrix distribution and data structural unpacking
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