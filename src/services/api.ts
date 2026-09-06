// src/services/api.ts — Instancia centralizada de Axios

import axios from 'axios';

const envBaseUrl = typeof globalThis !== 'undefined' && (globalThis as any).process?.env?.EXPO_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: envBaseUrl || 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor global de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error('[API error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  },
);
