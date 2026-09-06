// src/services/api.ts
// Instancia Axios centralizada para el proyecto de la Semana 05.

import axios from 'axios';

// Declaración de tipos segura para process.env en Expo/React Native
declare const process: { env: { EXPO_PUBLIC_API_URL?: string } } | undefined;

// URL base de la API (JSONPlaceholder por defecto o variable de entorno Expo)
const API_BASE_URL =
  (typeof process !== 'undefined' && process?.env?.EXPO_PUBLIC_API_URL) ||
  'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de respuesta para logging y manejo centralizado de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error('[API Error]', error.response?.status, error.config?.url, error.message);
    }
    return Promise.reject(error);
  }
);
