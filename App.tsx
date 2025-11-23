// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AppNavigator } from '@/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
