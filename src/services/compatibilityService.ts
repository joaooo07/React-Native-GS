import { api } from "./api";

export interface CompatibilityPayload {
  jobTitle: string;
  jobDescription: string;
  idResume: number;
}

export interface CompatibilityResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendedSkills: string[];
  recommendedCourses: string[];
  summary: string;
}

export const runAnalysis = async (payload: any) => {
  const r = await api.post(`/analysis`, payload);
  return r.data; 
};

export const getAnalysisResult = async (id: number) => {
  const r = await api.get(`/analysis/${id}`);
  return r.data;
};

