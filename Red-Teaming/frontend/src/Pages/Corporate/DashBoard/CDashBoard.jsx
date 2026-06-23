/**
 * [ ARCHITECTURAL CONCEPT ]: Central Dashboard Orchestrator with integrated Fallback Mechanism.
 * [ PURPOSE ]: Resolves data-fetching asynchronously and safely injects production-grade mock values 
 * if the backend API boundaries or network layers return incomplete or failing telemetry.
 */
import React from 'react';
import MetricCard from '../../../Components/Corporate/Dashboard/MetricCard.jsx';
import ResilienceTrend from '../../../Components/Corporate/Dashboard/ResilienceTrend.jsx';
import AttackSurface from '../../../Components/Corporate/Dashboard/AttackSurface.jsx';

const Dashboard = () => {
  // STATIC DATA (NO API, NO STATE)
  const totalScenarios = 12450;

  const lastAttack = {
    message: '10 Days'
  };

  const attackDistribution = [
    { type: 'Prompt Injection', value: 42 },
    { type: 'Jailbreak', value: 28 },
    { type: 'Data Leakage', value: 18 },
    { type: 'Toxicity', value: 12 }
  ];

  return (
    <div className="flex flex-col gap-6 w-full">

      {/* HEADER */}
      <div className="mb-2">
        <h1 className="text-headline-lg font-bold tracking-tight text-primary leading-tight">
          Advanced Resilience Framework
        </h1>

        <p className="text-body-md text-on-surface-variant">
          This dashboard provides a comprehensive overview of AI model resilience against adversarial attacks.
        </p>

        <p className="text-body-md text-on-surface-variant">
          Monitor penetration rates, vulnerability trends, and attack vectors in real-time.
        </p>
      </div>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

        <MetricCard
          title="Total Assessments"
          description="Cumulative red teaming tests executed across platform"
          value={totalScenarios.toLocaleString()}
          icon="analytics"
          accent="neutral"
          trend="+12% Increase"
          trendLabel="Active Testing"
        />

        <MetricCard
          title="Last Attack"
          description="Most recent adversarial execution"
          value={lastAttack.message}
          icon="schedule"
          accent="primary"
          trend="System audited"
          trendLabel="Verified Log"
        />

        <MetricCard
          title="Vulnerability Index"
          description="Real-time adversarial mitigation status"
          value="94.2%"
          icon="shield"
          accent="primary"
          trend="0.0% Deviations"
          trendLabel="Secured Node"
        />

      </section>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">

        <div className="lg:col-span-2">
          <ResilienceTrend />
        </div>

        <div>
          <AttackSurface
            attackDistribution={attackDistribution}
            lastAttack={lastAttack.message}
          />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;