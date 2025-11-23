import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme as baseTheme } from '@/theme/theme';


type ThemeMode = 'light' | 'dark';
type PrimaryColor = 'blue' | 'purple' | 'green' | 'orange';
type CardStyle = 'default' | 'rounded' | 'gradient';
type FontStyle = 'normal' | 'bold' | 'clean';

interface ThemePreferences {
  themeMode: ThemeMode;
  primaryColor: PrimaryColor;
  cardStyle: CardStyle;
  fontStyle: FontStyle;
  animationsEnabled: boolean;
}

interface ThemeContextProps extends ThemePreferences {
  setThemeMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: PrimaryColor) => void;
  setCardStyle: (style: CardStyle) => void;
  setFontStyle: (font: FontStyle) => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  theme: any; 
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
  const [primaryColor, setPrimaryColorState] = useState<PrimaryColor>('blue');
  const [cardStyle, setCardStyleState] = useState<CardStyle>('default');
  const [fontStyle, setFontStyleState] = useState<FontStyle>('normal');
  const [animationsEnabled, setAnimationsEnabledState] = useState<boolean>(true);


  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('@prefs');
      if (stored) {
        const prefs = JSON.parse(stored);
        setThemeModeState(prefs.themeMode);
        setPrimaryColorState(prefs.primaryColor);
        setCardStyleState(prefs.cardStyle);
        setFontStyleState(prefs.fontStyle);
        setAnimationsEnabledState(prefs.animationsEnabled);
      }
    })();
  }, []);


  const savePrefs = async (newPrefs: ThemePreferences) => {
    await AsyncStorage.setItem('@prefs', JSON.stringify(newPrefs));
  };

  const updatePrefs = (partial: Partial<ThemePreferences>) => {
    const newPrefs = {
      themeMode,
      primaryColor,
      cardStyle,
      fontStyle,
      animationsEnabled,
      ...partial,
    };
    savePrefs(newPrefs);

    if (partial.themeMode !== undefined) setThemeModeState(partial.themeMode);
    if (partial.primaryColor !== undefined) setPrimaryColorState(partial.primaryColor);
    if (partial.cardStyle !== undefined) setCardStyleState(partial.cardStyle);
    if (partial.fontStyle !== undefined) setFontStyleState(partial.fontStyle);
    if (partial.animationsEnabled !== undefined) setAnimationsEnabledState(partial.animationsEnabled);
  };

  const theme = {
    ...baseTheme,
      colors: {
      ...baseTheme.colors,
      primary:
        primaryColor === 'blue' ? '#3B82F6' :
        primaryColor === 'purple' ? '#A855F7' :
        primaryColor === 'green' ? '#22C55E' :
        '#F59E0B', 

      background: themeMode === 'dark' ? '#0F172A' : '#FFFFFF',
      surface: themeMode === 'dark' ? '#1E293B' : '#F2F2F2',
      textPrimary: themeMode === 'dark' ? '#FFFFFF' : '#111827',
      textSecondary: themeMode === 'dark' ? '#CBD5E1' : '#4B5563',

      border: themeMode === 'dark' ? '#334155' : '#D1D5DB',
    },

    font: {
      style: fontStyle,
    },

    cards: {
      style: cardStyle,

      radius:
        cardStyle === 'rounded' ? 20 :
        cardStyle === 'gradient' ? 18 :
        10,

      borderWidth:
        cardStyle === 'default' ? 1 :
        cardStyle === 'rounded' ? 1 :
        0,

      borderColor:
        cardStyle === 'gradient'
          ? 'rgba(255,255,255,0.25)'
          : themeMode === 'dark'
          ? '#334155'
          : '#D1D5DB',

      shadowStyle:
        cardStyle === 'gradient'
          ? {
              elevation: 4,
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            }
          : cardStyle === 'default'
          ? {
              elevation: 2,
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 1 },
            }
          : {}, 
    },

    animationsEnabled,
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        primaryColor,
        cardStyle,
        fontStyle,
        animationsEnabled,
        setThemeMode: (mode) => updatePrefs({ themeMode: mode }),
        setPrimaryColor: (color) => updatePrefs({ primaryColor: color }),
        setCardStyle: (style) => updatePrefs({ cardStyle: style }),
        setFontStyle: (font) => updatePrefs({ fontStyle: font }),
        setAnimationsEnabled: (enabled) => updatePrefs({ animationsEnabled: enabled }),
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

