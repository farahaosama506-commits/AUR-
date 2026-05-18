import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      // Register
      register: async (username, email, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, confirmPassword }),
          });

          const data = await response.json();

          if (!data.success) {
            throw new Error(data.error);
          }

          // Save token and user
          localStorage.setItem('token', data.token);
          
          set({
            user: data.user,
            token: data.token,
            isLoggedIn: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({ isLoading: false, error: error.message });
          return false;
        }
      },

      // Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!data.success) {
            throw new Error(data.error);
          }

          // Save token and user
          localStorage.setItem('token', data.token);
          
          set({
            user: data.user,
            token: data.token,
            isLoggedIn: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({ isLoading: false, error: error.message });
          return false;
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          error: null,
        });
      },

      // Check Auth (on page load)
      checkAuth: async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
          set({ isLoggedIn: false, user: null });
          return;
        }

        try {
          const response = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await response.json();

          if (data.success) {
            set({
              user: data.user,
              token,
              isLoggedIn: true,
            });
          } else {
            // Token expired or invalid
            localStorage.removeItem('token');
            set({
              user: null,
              token: null,
              isLoggedIn: false,
            });
          }
        } catch (error) {
          set({
            user: null,
            token: null,
            isLoggedIn: false,
          });
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;