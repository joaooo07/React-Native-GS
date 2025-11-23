import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: any;
  inputStyle?: any;
};

export const TextField: React.FC<Props> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  }, [isFocused]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: isFocused
              ? theme.colors.primary
              : theme.colors.textSecondary,

            shadowColor: theme.colors.primary,
            shadowOpacity: isFocused ? 0.8 : 0,
            shadowRadius: isFocused ? 12 : 0,
            shadowOffset: { width: 0, height: 0 },

            elevation: isFocused ? 8 : 0,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            inputStyle,
            error && styles.inputError,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          {...props}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    label: {
      color: theme.colors.textPrimary,
      fontSize: 14,
      marginBottom: theme.spacing(1),
      fontWeight: "500",
    },

    inputWrapper: {
      backgroundColor: theme.colors.surface, 
      borderWidth: 2,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing(2),
      paddingVertical: theme.spacing(1.5),
    },

    input: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      width: "100%",
      textAlignVertical: "top",
    },

    inputError: {
      borderColor: theme.colors.error,
    },
    error: {
      color: theme.colors.error,
      fontSize: 12,
      marginTop: theme.spacing(1),
    },
  });
