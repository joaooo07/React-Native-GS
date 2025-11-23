import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/contexts/useAuth';
import { useTheme } from '@/contexts/ThemeContext';

import type { AuthStackParamList, AppTabParamList, RootStackParamList } from './types';

import { LoginScreen } from '@/screens/Auth/LoginScreen';
import { SignupScreen } from '@/screens/Auth/SignupScreen';
import { HomeScreen } from '@/screens/Home/HomeScreen';
import { ResumesListScreen } from '@/screens/Resumes/ResumesListScreen';
import { ProfileScreen } from '@/screens/Profile/ProfileScreen';
import { CompatibilityScreen } from '@/screens/Compatibility/CompatibilityScreen';
import { AboutScreen } from '@/screens/About/AboutScreen';
import { PersonalizeScreen } from '@/screens/Settings/PersonalizeScreen';

import { Ionicons } from '@expo/vector-icons';
import { AnalysisResultScreen } from '@/screens/Compatibility/AnalysisResultScreen';
import { ResumeFormScreen } from '@/screens/Resumes/ResumeFormScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppTabs = createBottomTabNavigator<AppTabParamList>();

// STACK DAS TELAS DE LOGIN/CADASTRO
const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
);

// TABS PRINCIPAIS DO APLICATIVO
const AppTabsNavigator = () => {
  const { theme } = useTheme();

  return (
    <AppTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border 
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Resumes') iconName = 'document-text';
          if (route.name === 'Profile') iconName = 'person-circle';
          if (route.name === 'Compatibility') iconName = 'analytics';
          if (route.name === 'About') iconName = 'information-circle';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <AppTabs.Screen name="Home" component={HomeScreen} />
      <AppTabs.Screen name="Resumes" component={ResumesListScreen} />
      <AppTabs.Screen name="Compatibility" component={CompatibilityScreen} />
      <AppTabs.Screen name="Profile" component={ProfileScreen} />
      <AppTabs.Screen name="About" component={AboutScreen} />
    </AppTabs.Navigator>
  );
};

// ROOT DO APP (STACK PRINCIPAL)
export const AppNavigator: React.FC = () => {
  const { isAuthenticated, loadingInitial } = useAuth();
  const { theme } = useTheme();

  if (loadingInitial) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <RootStack.Screen name="AppTabs" component={AppTabsNavigator} />
            <RootStack.Screen name="Personalize" component={PersonalizeScreen} />
            <RootStack.Screen name="AnalysisResult" component={AnalysisResultScreen} />
            <RootStack.Screen name="ResumeForm" component={ResumeFormScreen} />


          </>
        ) : (
          <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
