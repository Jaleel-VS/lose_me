import {auth} from '@/util/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const isLoggedIn = (): boolean => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      return true;
    }
  });
  return false;
};

export const onAuthStateChanged = (callback: any) => {
  return auth.onAuthStateChanged(callback);
};




