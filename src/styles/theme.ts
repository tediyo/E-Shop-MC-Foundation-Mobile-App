export const theme = {
  colors: {
    primary: '#6366F1', // Indigo
    primaryDark: '#4F46E5',
    secondary: '#EC4899', // Pink
    accent: '#10B981', // Emerald
    background: '#F8FAFC', // Slate 50
    surface: '#FFFFFF',
    surfaceVariant: '#F1F5F9', // Slate 100
    text: {
      primary: '#0F172A', // Slate 900
      secondary: '#64748B', // Slate 500
      tertiary: '#94A3B8', // Slate 400
      inverse: '#FFFFFF',
    },
    border: '#E2E8F0', // Slate 200
    borderFocus: '#6366F1',
    error: '#EF4444', // Red 500
    success: '#10B981', // Emerald 500
    warning: '#F59E0B', // Amber 500
    info: '#3B82F6', // Blue 500
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
  },
};

export type Theme = typeof theme;
