// src/contexts/AuthContext.tsx
import React, { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest, signupRequest } from '@/services/authService';

export type AuthUser = {
  id: number;
  name: string;
  email?: string; // opcional pois a API não retorna
};

type AuthContextData = {
  user: AuthUser | null;
  token: string | null;
  loadingInitial: boolean;
  signing: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const STORAGE_KEY = '@careerlens/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [signing, setSigning] = useState(false);

  // Carrega auth salvo no storage ao iniciar
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as { user: AuthUser; token: string };
          setUser(parsed.user);
          setToken(parsed.token);
        }
      } catch (error) {
        console.log('Erro ao carregar auth do storage', error);
      } finally {
        setLoadingInitial(false);
      }
    };

    loadStoredAuth();
  }, []);

  // Salva no storage e no estado
  const persistAuth = async (data: { user: AuthUser; token: string }) => {
    setUser(data.user);
    setToken(data.token);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // LOGIN REAL (API Java)
  const signIn = useCallback(async (email: string, password: string) => {
    setSigning(true);
    try {
      const result = await loginRequest({ email, password });

      // A API retorna: { id, name, token }
      await persistAuth({
        user: {
          id: result.id,
          name: result.name,
          email: email, // usamos o email informado no login
        },
        token: result.token,
      });
    } finally {
      setSigning(false);
    }
  }, []);

  // SIGNUP REAL (API Java)
  const signUp = useCallback(async (name: string, email: string, password: string) => {
    setSigning(true);
    try {
      const result = await signupRequest({ name, email, password });

      // API retorna igual ao login: { id, name, token }
      await persistAuth({
        user: {
          id: result.id,
          name: result.name,
          email: email,
        },
        token: result.token,
      });
    } finally {
      setSigning(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loadingInitial,
        signing,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
