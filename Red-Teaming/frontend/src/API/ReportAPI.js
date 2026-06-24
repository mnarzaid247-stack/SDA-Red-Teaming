/**
 * * [ architectural concept ]:
 * A centralized Service Module dedicated to handling data retrieval for security 
 * assessment reports, audit summaries, and detailed technical findings.
 * Domain-Driven Setup: Consolidates all report-related operations under the 
 * (/reports) resource domain, ensuring a single source of truth for audit data.
 * 
 * * [ File Stucture ]:
 * - getReports: Fetches an overview of all generated security reports (supporting dynamic filters/params).
 * - getReportDetails: Retrieves comprehensive analytics and technical logs for a specific report via its Attack Run ID.
 */
import api from './axiosInstance';

// 1. Fetch All Generated Reports (with optional filtering parameters)
export const getReports = async (params = {}) => {
  const response = await api.get('/reports', { params });
  return response.data;
};

// 2. Fetch Detailed Analytics for a Single Report by ID
export const getReportDetails = async (attackRunId) => {
  const response = await api.get(`/reports/${attackRunId}`);
  return response.data;
};