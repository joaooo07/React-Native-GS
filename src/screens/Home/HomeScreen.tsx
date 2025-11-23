import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '@/components/Layout/ScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { AppCard } from '@/components/DesignSystem/AppCard';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScreenContainer>

      <Text style={styles.title}>CareerLens</Text>
      <Text style={styles.subtitle}>Seu futuro profissional começa aqui</Text>

      <View style={styles.grid}>

        <AppCard style={styles.cardWrapper}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('Resumes')}
          >
            <FontAwesome5 name="file-alt" size={32} color={theme.colors.primary} />
            <Text style={styles.cardText}>Meus Currículos</Text>
          </TouchableOpacity>
        </AppCard>

        <AppCard style={styles.cardWrapper}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('Compatibility')}
          >
            <MaterialIcons name="insights" size={36} color={theme.colors.primary} />
            <Text style={styles.cardText}>Analisar Vaga</Text>
          </TouchableOpacity>
        </AppCard>

        <AppCard style={styles.cardWrapper}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <FontAwesome5 name="user" size={34} color={theme.colors.primary} />
            <Text style={styles.cardText}>Meu Perfil</Text>
          </TouchableOpacity>
        </AppCard>

        <AppCard style={styles.cardWrapper}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('About')}
          >
            <MaterialIcons name="info" size={36} color={theme.colors.primary} />
            <Text style={styles.cardText}>Sobre o App</Text>
          </TouchableOpacity>
        </AppCard>

        <AppCard style={styles.cardWrapper}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('Personalize')}
          >
            <MaterialIcons name="brush" size={36} color={theme.colors.primary} />
            <Text style={styles.cardText}>Personalizar App</Text>
          </TouchableOpacity>
        </AppCard>

      </View>
    </ScreenContainer>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    title: {
      color: theme.colors.textPrimary,
      fontSize: 28,
      fontWeight: '700',
      textAlign: 'center',
      marginTop: theme.spacing(3),
    },
    subtitle: {
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(1),
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
    },

    cardWrapper: {
      width: '44%',
      margin: 8,
    },

    cardButton: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing(2),
    },

    cardText: {
      marginTop: theme.spacing(1),
      color: theme.colors.textPrimary,
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
    },
  });
