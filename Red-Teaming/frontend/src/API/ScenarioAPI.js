import api from './axiosInstance';

export const getScenariosByType = async (attackType) => {
  const response = await api.get(`/scenarios/type/${attackType}`);
  return response.data;
};

export const createScenario = async (scenarioData) => {
  const response = await api.post('/scenarios', scenarioData);
  return response.data;
};

export const updateScenario = async (scenarioId, scenarioData) => {
  const response = await api.put(`/scenarios/${scenarioId}`, scenarioData);
  return response.data;
};

export const deleteScenario = async (scenarioId) => {
  const response = await api.delete(`/scenarios/${scenarioId}`);
  return response.data;
};