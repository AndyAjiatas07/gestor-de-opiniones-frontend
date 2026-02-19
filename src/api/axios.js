import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/OpinaNetAdmin/v1",
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("opinanet_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("opinanet_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;