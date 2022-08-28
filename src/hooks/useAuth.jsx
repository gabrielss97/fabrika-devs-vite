/* eslint-disable import/order */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import db from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  deleteUser,
  signOut,
} from 'firebase/auth';

import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const auth = getAuth();

  // Cleanup
  const [cancelled, setCancelled] = useState(false);

  const checkCancelled = () => {
    if (cancelled) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  // Register
  const createUser = async (data) => {
    checkCancelled();
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });
      setLoading(false);
      return user;
    } catch (e) {
      let systemErrorMsg;

      if (e.message.includes('Password')) {
        systemErrorMsg = 'A senha precisa ter pelo menos 6 caracteres.';
      } else if (e.message.includes('email-already')) {
        systemErrorMsg = 'E-mail já cadastrado.';
      } else {
        systemErrorMsg = 'Ocorreu um erro, tente novamente mais tarde.';
      }
      setError(systemErrorMsg);
      setLoading(false);
    }
  };

  // Login
  const login = async (user) => {
    checkCancelled();
    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setLoading(false);
    } catch (e) {
      let systemErrorMsg;

      if (e.message.includes('wrong-password')) {
        systemErrorMsg = 'Senha incorreta.';
      } else if (e.message.includes('user-not-found')) {
        systemErrorMsg = 'Usuário não cadastrado.';
      } else {
        systemErrorMsg = 'Ocorreu um erro, tente novamente mais tarde.';
      }
      setError(systemErrorMsg);
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    checkCancelled();
    signOut(auth);
  };

  // Update User

  // Delete User
  const removeUser = (userId) => {
    checkCancelled();
    setLoading(true);

    try {
      deleteUser(userId);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    login,
    logout,
    removeUser,
  };
};
