// src/screens/Settings/PersonalizeScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '@/components/Layout/ScreenContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const PersonalizeScreen: React.FC = () => {
  const navigation = useNavigation();

  const {
    theme,
    themeMode,
    setThemeMode,
    primaryColor,
    setPrimaryColor,
    cardStyle,
    setCardStyle,
    fontStyle,
    setFontStyle,
    animationsEnabled,
    setAnimationsEnabled,
  } = useTheme();

  const styles = createStyles(theme);

  return (
    <ScreenContainer>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={theme.colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Personalizar App</Text>

        {/* espaço pro título centralizado */}
        <View style={{ width: 26 }} />
      </View>

      {/* DARK MODE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tema</Text>

        <View style={styles.row}>
          <Text style={styles.optionLabel}>Modo escuro</Text>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={(v) => setThemeMode(v ? 'dark' : 'light')}
          />
        </View>
      </View>

      {/* COR PRIMÁRIA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cor Primária</Text>

        <View style={styles.colorRow}>
          {['blue', 'purple', 'green', 'orange'].map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.colorCircle,
                { backgroundColor: getColor(c) },
                primaryColor === c && styles.colorSelected,
              ]}
              onPress={() => setPrimaryColor(c as any)}
            />
          ))}
        </View>
      </View>

      {/* ESTILO DOS CARDS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estilo dos Cards</Text>

        {renderOption('Padrão', 'default', cardStyle, setCardStyle, styles)}
        {renderOption('Arredondado', 'rounded', cardStyle, setCardStyle, styles)}
        {renderOption('Gradiente', 'gradient', cardStyle, setCardStyle, styles)}
      </View>

      {/* FONTE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fonte Global</Text>

        {renderOption('Normal', 'normal', fontStyle, setFontStyle, styles)}
        {renderOption('Negrito', 'bold', fontStyle, setFontStyle, styles)}
        {renderOption('Clean', 'clean', fontStyle, setFontStyle, styles)}
      </View>

      {/* ANIMAÇÕES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animações</Text>

        <View style={styles.row}>
          <Text style={styles.optionLabel}>Ativar animações</Text>
          <Switch
            value={animationsEnabled}
            onValueChange={(v) => setAnimationsEnabled(v)}
          />
        </View>
      </View>

    </ScreenContainer>
  );
};


/* -------------------- Funções auxiliares -------------------- */

const renderOption = (
  label: string,
  value: string,
  current: string,
  onSelect: (v: any) => void,
  styles: any
) => (
  <TouchableOpacity onPress={() => onSelect(value)} style={styles.optionItem}>
    <Text style={styles.optionLabel}>{label}</Text>
    <View style={[styles.radio, current === value && styles.radioSelected]} />
  </TouchableOpacity>
);

const getColor = (c: string) => {
  switch (c) {
    case 'blue': return '#3B82F6';
    case 'purple': return '#A855F7';
    case 'green': return '#22C55E';
    case 'orange': return '#F59E0B';
    default: return '#3B82F6';
  }
};


/* -------------------- Estilos Dinâmicos -------------------- */

const createStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(1),
    },
    headerTitle: {
      color: theme.colors.textPrimary,
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
    },

    section: {
      marginBottom: theme.spacing(4),
      width: '100%',
    },
    sectionTitle: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: theme.spacing(1),
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing(1),
    },

    colorRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: theme.spacing(1),
    },

    colorCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.colors.textSecondary,
    },
    colorSelected: {
      borderColor: theme.colors.primary,
      borderWidth: 3,
    },

    optionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing(1),
      alignItems: 'center',
    },
    optionLabel: {
      color: theme.colors.textPrimary,
      fontSize: 15,
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: theme.colors.textSecondary,
    },
    radioSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
  });
