/**
 * * [ architectural concept ]:
 * A centralized Service Module dedicated to fetching high-level analytics, statistical 
 * metrics, and system status data required for the Veritas AI Dashboard.
 * Domain-Driven Setup: Groups all analytical endpoints (/dashboard) into a single 
 * module, ensuring consistent data aggregation for monitoring components.

 * * [ File Stucture ]:
 * - getTotalScenarios: Fetches the total number of tested security scenarios.
 * - getLastAttack: Retrieves details and timestamp of the most recent attack execution.
 * - getAttackRiskDistribution: Obtains the statistical distribution of identified risk levels.
 */
import api from './axiosInstance';


// 1. Get Total Tested Scenarios Count
export const getTotalScenarios = async () => {
  const res = await api.get('/dashboard/total-scenarios');
  return res.data;
};

// 2. Get Most Recent Attack Details
export const getLastAttack = async () => {
  const res = await api.get('/dashboard/last-attack');
  return res.data;
};

// 3. Get Attack Risk Distribution Statistics
export const getAttackRiskDistribution = async () => {
  const res = await api.get('/dashboard/attack-risk-distribution');
  return res.data;
};

// 4. Get Security Trend Analytics (Fetches time-series telemetry for system vulnerability and incident tracking)
export const getSecurityTrend = async () => {
  const response = await api.get("/dashboard/security-trend");
  return response.data;
};