// src/services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'http://gs-api-35.eastus.azurecontainer.io:8080/api/v1',
  timeout: 15000,
});
//http://localhost:8080/api/v1
//http://gs-api-34.eastus.azurecontainer.io:8080/api/v1
// Interceptor que pega o token correto do storage
api.interceptors.request.use(
  async (config) => {
    try {
      const raw = await AsyncStorage.getItem('@careerlens/auth');

      if (raw) {
        const parsed = JSON.parse(raw);
        const token = parsed.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.log("[TOKEN INTERCEPTOR ERROR]", err);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Log de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('[API ERROR]', error?.response?.data || error?.message);
    return Promise.reject(error);
  }
);
