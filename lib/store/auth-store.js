import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      register: async (username, email, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        
        try {
          if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
          }

          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await res.json();
          if (!data.success) throw new Error(data.error);

          // ✅ احفظ user كامل مع username
          set({ 
            user: { 
              id: data.user.id, 
              email: data.user.email, 
              username: data.user.username || username 
            }, 
            isLoggedIn: true, 
            isLoading: false 
          });
          return true;
        } catch (error) {
          set({ isLoading: false, error: error.message });
          return false;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();
          if (!data.success) throw new Error(data.error);

          // ✅ احفظ user كامل مع username
          set({ 
            user: { 
              id: data.user.id, 
              email: data.user.email, 
              username: data.user.username || data.user.email?.split('@')[0] || 'User'
            }, 
            isLoggedIn: true, 
            isLoading: false 
          });
          return true;
        } catch (error) {
          set({ isLoading: false, error: error.message });
          return false;
        }
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
        // ✅ امسح localStorage كمان
        localStorage.removeItem('auth-storage');
      },
      
      clearError: () => set({ error: null }),
      
      checkAuth: () => {
        try {
          const stored = JSON.parse(localStorage.getItem('auth-storage') || '{}');
          if (stored.state?.user) {
            // ✅ تأكد من إن username موجود
            const user = stored.state.user;
            if (user.id && user.email) {
              set({ 
                user: {
                  id: user.id,
                  email: user.email,
                  username: user.username || user.email?.split('@')[0] || 'User'
                }, 
                isLoggedIn: true 
              });
            }
          }
        } catch (e) {
          // لا شيء
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,  // ✅ احفظ user كامل
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;