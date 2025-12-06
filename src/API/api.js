import axios from "axios";
import authStore from "../components/store/authStore";

export const api = axios.create({
  baseURL: "https://org-ave-jimmy-learners.trycloudflare.com",
});

api.interceptors.request.use((config) => {
  const { access } = authStore.getState();
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});