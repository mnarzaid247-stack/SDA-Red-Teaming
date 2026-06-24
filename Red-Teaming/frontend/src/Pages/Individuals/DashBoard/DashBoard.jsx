/**
 * [ ARCHITECTURAL CONCEPT ]: The central Orchestrator/Page component acting as the application state layer.
 * [ PURPOSE ]: Resolves data-fetching via asynchronous concurrency, manages loading/error boundaries, 
 * and distributes live backend telemetry to presentation sub-components (MetricCard, ResilienceTrend, AttackSurface).
 */

import React from 'react';
import { useEffect, useState } from 'react';
import MetricCard from "../../../Components/Individuals/Dashboard/MetricCard.jsx";
import ResilienceTrend from "../../../Components/Individuals/Dashboard/ResilienceTrend.jsx";
import AttackSurface from "../../../Components/Individuals/Dashboard/AttackSurface.jsx";

import { getTotalScenarios, getLastAttack, getAttackRiskDistribution } from '../../../API/DashBoardAPI.js';

const Dashboard = () => {
  // 1. STATE CONFIG: Structural reactive anchors for component lifecycle and API payload storage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalScenarios, setTotalScenarios] = useState(0);
  const [lastAttack, setLastAttack] = useState(null);
  const [attackDistribution, setAttackDistribution] = useState([]);

  // 2. DATA ACQUISITION PIPELINE: Concurrently resolves backend network promises
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Concurrent invocation reduces total API latency footprint
      const [totalRes, lastRes, attackRes] = await Promise.all([
        getTotalScenarios(),
        getLastAttack(),
        getAttackRiskDistribution()
      ]);

      // State synchronization with structural fallback filters
      setTotalScenarios(totalRes?.total_scenarios ?? 0);
      setLastAttack(lastRes || null);
      setAttackDistribution(attackRes || []);

    } catch (err) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // 3. LIFECYCLE EFFECT: Executes telemetry sync routine upon initial DOM mount layout sequence
  useEffect(() => {
    fetchDashboardData();
  }, []);

// 4. CONDITIONAL RENDER: Loading Skeleton Boundary Layout
if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full animate-pulse">

        <div className="h-10 w-1/2 bg-surface-container rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-surface-container rounded-2xl" />
          <div className="h-32 bg-surface-container rounded-2xl" />
          <div className="h-32 bg-surface-container rounded-2xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 bg-surface-container rounded-2xl" />
          <div className="h-64 bg-surface-container rounded-2xl" />
        </div>

      </div>
    );
  }

  // 5. CONDITIONAL RENDER: Fault Tolerance Network Error Boundary
  if (error) {
    return (
      <div className="text-error text-sm">
        Failed to load dashboard: {error}
      </div>
    );
  }

  // 6. MAIN VIEWPORT RESOLUTION: Structural Layout Mapping
  return (
    <div className="flex flex-col gap-6 w-full">

      {/* HEADER */}
      <div className="mb-2">
        <h1 className="text-headline-lg font-bold tracking-tight text-primary leading-tight">
          DashBoard
        </h1>
        <p className="text-body-md text-on-surface-variant">
          <br/>
          This dashboard provides a comprehensive overview of the AI model's resilience against adversarial attacks.
        </p>

        <p className="text-body-md text-on-surface-variant">
          From here, you can monitor dynamic penetration rates, track vulnerability trends over time, and identify attack vectors.
        </p>
      </div>

      {/* NODE: High-Level KPI Metric Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

        <MetricCard
          title="Total Assessments"
          description="Cumulative red teaming tests executed across platform"
          value={totalScenarios.toLocaleString()}
          icon="analytics"
          accent="neutral"
        />

        <MetricCard
          title="Last Attack"
          description="Most recent attack execution"
          value={lastAttack?.message || 'No Data'}
          icon="schedule"
          accent="primary"
        />

        <MetricCard
          title="System Status"
          description="Live monitoring status"
          value="Active"
          icon="shield"
          accent="primary"
        />

      </section>

      {/* NODE: Complex Analytics Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">

        <div className="lg:col-span-2">
          <ResilienceTrend />
        </div>

        {/* Auxiliary Vector Proportional Container */}
        <div>
          <AttackSurface
            attackDistribution={attackDistribution}
            lastAttack={lastAttack?.message}
          />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;