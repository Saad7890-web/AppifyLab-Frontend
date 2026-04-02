import { storage } from "@/utils/storage";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: storage.getUser(),
  accessToken: storage.getAccessToken(),
  refreshToken: storage.getRefreshToken(),
  isAuthenticated: !!storage.getAccessToken(),

  setAuth: ({ user, accessToken, refreshToken }) => {
    if (user) storage.setUser(user);
    if (accessToken) storage.setAccessToken(accessToken);
    if (refreshToken) storage.setRefreshToken(refreshToken);

    set({
      user: user || storage.getUser(),
      accessToken: accessToken || storage.getAccessToken(),
      refreshToken: refreshToken || storage.getRefreshToken(),
      isAuthenticated: !!(accessToken || storage.getAccessToken()),
    });
  },

  clearAuth: () => {
    storage.clearAuth();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
}));