import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, signInWithGoogle, logout as supabaseLogout } from '../supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Listen for Auth State Changes (this runs first and catches OAuth redirects)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth State Changed:', event);
      
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setCurrentUser(session?.user ?? null);
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setLoading(false);
      } else if (event === 'INITIAL_SESSION') {
        // This is called once on mount
        setCurrentUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin, // Redirect to home, let router handle redirect
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed: ' + error.message);
    }
  };

  const logout = async () => {
    try {
      await supabaseLogout();
      window.location.href = '/'; // Clear state by redirecting to home
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const value = {
    currentUser,
    loginWithGoogle,
    logout,
    loading,
    authError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
