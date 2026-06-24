/**
 * [ architectural concept  ]: 
 * A dedicated Service Module orchestrating cyber attack simulation scenarios, 
 * threat vector configurations, and lifecycle testing within the "Scenarios" domain.
 * * [ File Stucture ]:
 * - getScenariosByType: Fetches classified attack simulation blueprints based on threat vector type.
 * - createScenario: Provisions and registers a new attack simulation scenario.
 * - updateScenario: Modifies existing scenario parameters and execution payload.
 * - deleteScenario: Permanently purges an attack scenario instance from the system.
 */
import api from './axiosInstance';

// 1. Fetch Attack Blueprints By Categorized Type
export const getScenariosByType = async (attackType) => {
  const response = await api.get(`/scenarios/type/${attackType}`);
  return response.data;
};

// 2. Provision & Create New Attack Scenario
export const createScenario = async (scenarioData) => {
  const response = await api.post('/scenarios', scenarioData);
  return response.data;
};

// 3. Modify Configuration Metrics Of An Existing Scenario
export const updateScenario = async (scenarioId, scenarioData) => {
  const response = await api.put(`/scenarios/${scenarioId}`, scenarioData);
  return response.data;
};

// 4. Terminate & Purge Specific Scenario Instance
export const deleteScenario = async (scenarioId) => {
  const response = await api.delete(`/scenarios/${scenarioId}`);
  return response.data;
};