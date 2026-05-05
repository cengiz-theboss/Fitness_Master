import { createContext, useContext, useState, useEffect } from 'react';
import { auth, signInWithGoogle as firebaseSignInWithGoogle, logout as firebaseLogout } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth State Changed:', user ? 'SIGNED_IN' : 'SIGNED_OUT');
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setAuthError(null);
      await firebaseSignInWithGoogle();
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      console.error('Login error:', errorMessage);
      setAuthError(errorMessage);
      alert('Login failed: ' + errorMessage);
    }
  };

  const logout = async () => {
    try {
      setAuthError(null);
      await firebaseLogout();
      window.location.href = '/'; // Clear state by redirecting to home
    } catch (error) {
      const errorMessage = error.message || 'Logout failed';
      console.error('Logout error:', errorMessage);
      setAuthError(errorMessage);
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

