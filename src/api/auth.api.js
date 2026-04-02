import { http } from "./http";

export const authApi = {
  register: async (payload) => {
    const { data } = await http.post("/api/auth/register", payload);
    return data;
  },

  login: async (payload) => {
    const { data } = await http.post("/api/auth/login", payload);
    return data;
  },

  me: async () => {
    const { data } = await http.get("/api/auth/me");
    return data;
  },

  refresh: async () => {
    const { data } = await http.post("/api/auth/refresh");
    return data;
  },

  logout: async () => {
    const { data } = await http.post("/api/auth/logout");
    return data;
  },
};