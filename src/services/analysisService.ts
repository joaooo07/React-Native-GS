import { api } from "./api";

export const fetchAnalysisResult = async (id: number) => {
  const r = await api.get(`/analysis/${id}`);
  return r.data;
};

/** Calcula score baseado nas skills */
export const calculateScore = (
  matchCount: number,
  gapCount: number
): number => {
  const total = matchCount + gapCount;
  if (total === 0) return 0;
  return Math.round((matchCount / total) * 100);
};
