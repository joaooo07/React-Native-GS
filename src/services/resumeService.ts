import { api } from './api';

export interface Resume {
  id: number;
  title: string;
  description: string;
}

export interface ResumePayload {
  title: string;
  description: string;
}

/** LISTA — agora correto com PAGE */
// src/services/resumeService.ts

export const getResumes = async (): Promise<Resume[]> => {
  try {
    const r = await api.get(`/resume`);
    return r.data.content;
  } catch (err) {
    console.log("API OFF → usando MOCK.");
    return [];
  }
};


/** CRIAR */
export const createResume = async (payload: ResumePayload): Promise<Resume> => {
  const r = await api.post(`/resume`, payload);
  return r.data;
};

/** ATUALIZAR */
export const updateResume = async (id: number, payload: ResumePayload): Promise<Resume> => {
  const r = await api.put(`/resume/${id}`, payload);
  return r.data;
};

/** DELETAR */
export const deleteResume = async (id: number): Promise<boolean> => {
  const r = await api.delete(`/resume/${id}`);
  return r.status === 200 || r.status === 204;
};
