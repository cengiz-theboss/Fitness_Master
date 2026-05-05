import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// --- FIREBASE CONFIGURATION ---
// 1. Go to https://console.firebase.google.com
// 2. Create a new project or select existing one
// 3. Go to Project Settings (gear icon) → General
// 4. Copy your Web App config below

const firebaseConfig = {
  apiKey: 'AIzaSyAhNxx474JwyUcsGFJsYc7ctXfKpSv3euQ',
  authDomain: 'fitnessmaster-2605b.firebaseapp.com',
  projectId: 'fitnessmaster-2605b',
  storageBucket: 'fitnessmaster-2605b.firebasestorage.app',
  messagingSenderId: '663858935669',
  appId: '1:663858935669:web:335dfef34c61f593aa453c',
  measurementId: 'G-2JQJ21MFPC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Set up Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Helper for Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

// Helper for Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
