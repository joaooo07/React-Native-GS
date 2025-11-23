// src/screens/Auth/LoginScreen.tsx

import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { ScreenContainer } from '@/components/Layout/ScreenContainer';
import { TextField } from '@/components/UI/TextField';
import { PrimaryButton } from '@/components/UI/PrimaryButton';
import { useAuth } from '@/contexts/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { useTheme } from '@/contexts/ThemeContext';

// 🔥 Novo:
import { AppText } from '@/components/DesignSystem/AppText';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { signIn, signing } = useAuth();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      await signIn(email, password);
    } catch (err) {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScreenContainer style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* LOGO + TÍTULO */}
          <View style={styles.header}>
            <Image
              source={require('@/assets/images/careerlens_logo_white.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <AppText size={26} weight="bold" style={styles.title}>
              Entrar
            </AppText>
          </View>

          {/* FORM */}
          <View style={styles.formContainer}>
            <TextField
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextField
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {error ? (
              <AppText color={theme.colors.error || '#EF4444'} style={styles.error}>
                {error}
              </AppText>
            ) : null}

            <PrimaryButton
              title={signing ? 'Entrando...' : 'Entrar'}
              onPress={handleLogin}
              disabled={signing}
              style={{ marginTop: theme.spacing(2) }}
            />
          </View>

          {/* LINK CRIAR CONTA */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{ marginTop: theme.spacing(3), marginBottom: 40 }}
          >
            <AppText color={theme.colors.primary} weight="medium" size={16}>
              Criar conta
            </AppText>
          </TouchableOpacity>
        </ScrollView>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
};

/* ---------------- STYLES DINÂMICOS ---------------- */

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
    },
    scroll: {
      paddingTop: theme.spacing(2),
      paddingHorizontal: theme.spacing(3),
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
      tintColor: theme.colors.textPrimary,
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    formContainer: {
      width: '100%',
      maxWidth: 380,
      alignSelf: 'center',
    },
    error: {
      marginTop: theme.spacing(1),
    },
  });
