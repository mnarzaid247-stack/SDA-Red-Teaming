/**
 * [ ARCHITECTURAL CONCEPT ]:
 * A centralized Service Module managing all API interactions for the "Attacks" domain.
 * 
 * [ FILE STRUCTURE ]:
 *   - runAttack: Triggers the Automated Vulnerability Suite.
 *   - runManualAttack: Triggers the custom Manual Sandbox Attack.
 *   - getAttackReport: Fetches specific attack analytics using its unique ID.
 * 
 */
import api from './axiosInstance';

// 1. Trigger Automated Vulnerability Suite
export const runAttack = async (payload) => {
  const res = await api.post('/attacks/run', payload);
  return res.data;
};

// 2. Trigger Manual Sandbox Attack
export const runManualAttack = async (payload) => {
  const res = await api.post('/attacks/manual', payload);
  return res.data;
};

// 3. Fetch Attack Report Details by ID
export const getAttackReport = async (id) => {
  const res = await api.get(`/attacks/${id}`);
  return res.data;
};