import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      // Register - هذا الكود هنا
      register: async (username, email, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        
        try {
          if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
          }

          if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
          }

          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await response.json();

          if (!data.success) {
            throw new Error(data.error);
          }

          set({
            user: data.user,
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
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          set({
            user: { id: data.user.id, email },
            session: data.session,
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
      logout: async () => {
        await supabase.auth.signOut();
        set({
          user: null,
          session: null,
          isLoggedIn: false,
          error: null,
        });
      },

      // Check Auth
      checkAuth: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          set({
            user: { id: session.user.id, email: session.user.email },
            session,
            isLoggedIn: true,
          });
        } else {
          set({ user: null, session: null, isLoggedIn: false });
        }
      },

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