import axios from 'axios';
import type { AnalysisRequest, AnalysisResponse } from '../types/analysis';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const startAnalysis = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  const { data } = await apiClient.post<AnalysisResponse>('/api/analysis', request);
  return data;
};

export const getAnalysis = async (id: string): Promise<AnalysisResponse> => {
  const { data } = await apiClient.get<AnalysisResponse>(`/api/analysis/${id}`);
  return data;
};
