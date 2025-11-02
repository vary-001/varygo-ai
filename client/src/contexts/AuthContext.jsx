// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name
    await updateProfile(userCredential.user, {
      displayName: name
    });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name: name,
      email: email,
      createdAt: new Date(),
      lastLogin: new Date()
    });

    return userCredential;
  };

  // Login with email and password
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      lastLogin: new Date()
    }, { merge: true });

    return userCredential;
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    
    // Check if user exists in Firestore, if not create document
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        createdAt: new Date(),
        lastLogin: new Date(),
        photoURL: userCredential.user.photoURL
      });
    } else {
      // Update last login
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        lastLogin: new Date()
      }, { merge: true });
    }

    return userCredential;
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email) => {
    // You can implement this later with Firebase Auth
    console.log('Reset password for:', email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUser({
              uid: user.uid,
              email: user.email,
              name: user.displayName || userDoc.data().name,
              photoURL: user.photoURL || userDoc.data().photoURL,
              ...userDoc.data()
            });
          } else {
            setUser({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signup,
    login,
    signInWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}