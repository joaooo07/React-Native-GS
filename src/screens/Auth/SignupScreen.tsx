// src/screens/Auth/SignupScreen.tsx

import React, { useState } from 'react';
import {
  Text,
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
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export const SignupScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { signUp, signing } = useAuth();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');

    if (!name || !email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      await signUp(name, email, password);
    } catch (err) {
      setError('Erro ao criar conta.');
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
            <Text style={styles.title}>Criar Conta</Text>
          </View>

          {/* FORM */}
          <View style={styles.formContainer}>
            <TextField
              label="Nome completo"
              value={name}
              onChangeText={setName}
            />

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

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <PrimaryButton
              title={signing ? 'Criando conta...' : 'Criar conta'}
              onPress={handleSignup}
              disabled={signing}
              style={{ marginTop: theme.spacing(2) }}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{ marginTop: theme.spacing(3), marginBottom: 40 }}
          >
            <Text style={styles.link}>Já tenho uma conta</Text>
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
      tintColor: theme.colors.textPrimary, // deixa logo branca no dark mode
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 26,
      fontWeight: '600',
      marginBottom: theme.spacing(2),
    },
    formContainer: {
      width: '100%',
      maxWidth: 380,
      alignSelf: 'center',
    },
    error: {
      color: theme.colors.error || '#EF4444',
      marginTop: theme.spacing(1),
    },
    link: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
  });
