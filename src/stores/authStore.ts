import { create } from 'zustand';
import { adminApi, type LoginPayload } from '@/api/adminApi';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('admin_token'),
  isAuthenticated: !!localStorage.getItem('admin_token'),
  isLoading: false,
  error: null,

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await adminApi.login(data);
      localStorage.setItem('admin_token', res.data.token);
      set({ token: res.data.token, isAuthenticated: true, isLoading: false });
    } catch {
      set({ error: 'Invalid credentials', isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    set({ token: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const token = localStorage.getItem('admin_token');
    set({ token, isAuthenticated: !!token });
  },
}));
