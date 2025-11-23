import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AppCard: React.FC<Props> = ({ children, style }) => {
  const { theme, cardStyle } = useTheme();

  const cardTheme = theme.cards;

  const cardBase = [
    {
      backgroundColor:
        cardStyle === 'gradient' ? 'transparent' : theme.colors.surface,
      borderRadius: cardTheme.radius,
      borderColor: cardTheme.borderColor,
      borderWidth: cardTheme.borderWidth,
      padding: 16,
      marginBottom: 16,
      ...cardTheme.shadowStyle, 
    },
    style,
  ];

  if (cardStyle === 'gradient') {
    return (
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          {
            borderRadius: cardTheme.radius,
            padding: 16,
            marginBottom: 16,
            ...cardTheme.shadowStyle,
          },
          style,
        ]}
      >
        {children}
      </LinearGradient>
    );
  }

  return <View style={cardBase}>{children}</View>;
};
