import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface Props extends TextProps {
  weight?: 'regular' | 'medium' | 'bold';
  size?: number;
  color?: string;
  children: React.ReactNode;
}

export const AppText: React.FC<Props> = ({
  weight = 'regular',
  size = 16,
  color,
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  const fontWeight =
    theme.font.style === 'bold'
      ? '700'
      : weight === 'bold'
      ? '700'
      : weight === 'medium'
      ? '500'
      : '400';

  const textColor = color || theme.colors.textPrimary;

  const finalStyle: TextStyle = {
    fontSize: size,
    color: textColor,
    fontWeight,
  };

  return (
    <Text style={[finalStyle, style]} {...rest}>
      {children}
    </Text>
  );
};
