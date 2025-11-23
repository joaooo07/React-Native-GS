export const theme = {
  colors: {
    background: '#020617',
    surface: '#0f172a',
    primary: '#6366F1',
    primaryDark: '#4F46E5',
    accent: '#F97316',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#1F2937',
    error: '#F97373',
    success: '#22C55E',
  },
  spacing: (multiplier: number) => multiplier * 8,
  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    xl: 32,
  },
};
export type Theme = typeof theme;
