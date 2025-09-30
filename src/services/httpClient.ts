// src/services/httpClient.ts
import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default httpClient;
