// src/components/Layout/ScreenContainer.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  center?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const ScreenContainer: React.FC<Props> = ({
  children,
  scroll = false,
  center = false,
  style,
}) => {
  const { theme } = useTheme();

  if (scroll) {
    return (
      <ScrollView
        style={[styles.scrollBase, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={[
          styles.container,
          center && styles.center,
          style,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        center && styles.center,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollBase: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
