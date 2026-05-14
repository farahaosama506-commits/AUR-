// lib/store/authStore.js
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // نجيب بيانات المستخدمين
          const response = await fetch('/api/auth');
          const data = await response.json();
          
          // نبحث عن المستخدم
          const user = data.users.find(
            u => u.username === username && u.password === password
          );
          
          if (user) {
            // نشيل كلمة السر من الـ state
            const { password: _, ...safeUser } = user;
            set({ 
              user: safeUser, 
              isLoggedIn: true, 
              isLoading: false,
              error: null 
            });
            return true;
          } else {
            set({ 
              isLoading: false, 
              error: 'Wrong username or password' 
            });
            return false;
          }
        } catch (err) {
          set({ 
            isLoading: false, 
            error: 'Connection failed' 
          });
          return false;
        }
      },

      logout: () => {
        set({ user: null, isLoggedIn: false, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isLoggedIn: state.isLoggedIn 
      }),
    }
  )
);

export default useAuthStore;