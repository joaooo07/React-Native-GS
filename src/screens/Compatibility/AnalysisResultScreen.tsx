// src/screens/Compatibility/AnalysisResultScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";

import { ScreenContainer } from "@/components/Layout/ScreenContainer";
import { PrimaryButton } from "@/components/UI/PrimaryButton";
import { useTheme } from "@/contexts/ThemeContext";
import { useRoute, useNavigation } from "@react-navigation/native";

import Svg, { Circle } from "react-native-svg";

import { AppText } from "@/components/DesignSystem/AppText";

import {
  fetchAnalysisResult,
  calculateScore,
} from "@/services/analysisService";

const screenWidth = Dimensions.get("window").width;

/* =======================
      BARRA ANIMADA
======================= */
const BarItem = ({ label, value, color, max, theme }: any) => {
  const widthAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: (value / max) * (screenWidth - 120),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={{ marginBottom: 22 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AppText size={15}>{label}</AppText>
        <AppText size={15}>{value}</AppText>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.surface,
          height: 14,
          borderRadius: 8,
          marginTop: 6,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            backgroundColor: color,
            width: widthAnim,
            borderRadius: 8,
          }}
        />
      </View>
    </View>
  );
};

/* =======================
        TELA
======================= */
export const AnalysisResultScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const route: any = useRoute();
  const navigation: any = useNavigation();

  const analysisId = route.params?.id;

  const [loading, setLoading] = useState(true);
  const [matchSkills, setMatchSkills] = useState<any[]>([]);
  const [gapSkills, setGapSkills] = useState<any[]>([]);
  const [extraSkills, setExtraSkills] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  const [viewMode, setViewMode] = useState<"number" | "chart" | "bars">(
    "number"
  );

  /* ----------------------------------------
        LOAD ANALYSIS FROM API
  ---------------------------------------- */
  useEffect(() => {
  let interval: any;

  const poll = async () => {
    try {
      const data = await fetchAnalysisResult(analysisId);

      const hasResults =
        data.matchingSkills.length > 0 ||
        data.missingSkills.length > 0 ||
        data.extraSkills.length > 0;

      if (hasResults) {
        setMatchSkills(data.matchingSkills);
        setGapSkills(data.missingSkills);
        setExtraSkills(data.extraSkills);

        const calculatedScore = calculateScore(
          data.matchingSkills.length,
          data.missingSkills.length
        );
        setScore(calculatedScore);

        setLoading(false);
        clearInterval(interval);
      }
    } catch (err) {
      console.log("Aguardando IA processar...");
    }
  };

  // Polling a cada 1 segundo
  interval = setInterval(poll, 1000);

  // Parar polling ao sair da tela
  return () => clearInterval(interval);
}, [analysisId]);



  /* ----------------------------------------
        LOADING
  ---------------------------------------- */
  if (loading) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </ScreenContainer>
    );
  }

  /* ----------------------------------------
        UI
  ---------------------------------------- */
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll}>
        <AppText style={styles.title} size={24} weight="bold">
          Resultado da Análise
        </AppText>

        {/* TOGGLE */}
        <View style={styles.toggleContainer}>
          {["number", "chart", "bars"].map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setViewMode(mode as any)}
              style={[
                styles.toggleButton,
                viewMode === mode && styles.toggleActive,
              ]}
            >
              <AppText
                color={
                  viewMode === mode ? "#fff" : theme.colors.textSecondary
                }
              >
                {mode === "number"
                  ? "Número"
                  : mode === "chart"
                  ? "Circular"
                  : "Barras"}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* NUMBER MODE */}
        {viewMode === "number" && (
          <View style={styles.scoreCard}>
            <AppText size={48} weight="bold" color={theme.colors.primary}>
              {score}%
            </AppText>
            <AppText color={theme.colors.textSecondary}>
              Compatibilidade
            </AppText>
          </View>
        )}

        {/* CIRCULAR */}
        {viewMode === "chart" && (
          <View style={styles.chartWrapper}>
            <Svg width={200} height={200}>
              <Circle
                cx="100"
                cy="100"
                r="80"
                stroke={theme.colors.textSecondary}
                strokeWidth={12}
                fill="none"
              />

              <Circle
                cx="100"
                cy="100"
                r="80"
                stroke={theme.colors.primary}
                strokeWidth={12}
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={
                  2 * Math.PI * 80 - (2 * Math.PI * 80 * score) / 100
                }
                fill="none"
              />
            </Svg>

            <AppText style={styles.chartScoreText} size={26} weight="bold">
              {score}%
            </AppText>
          </View>
        )}

        {/* BARS */}
        {viewMode === "bars" && (
          <View style={styles.barsWrapper}>
            <BarItem
              label="Match"
              value={matchSkills.length}
              color={theme.colors.primary}
              max={Math.max(matchSkills.length, gapSkills.length, score)}
              theme={theme}
            />

            <BarItem
              label="Gap"
              value={gapSkills.length}
              color="#EF4444"
              max={Math.max(matchSkills.length, gapSkills.length, score)}
              theme={theme}
            />

            <BarItem
              label="Score"
              value={score}
              color="#22C55E"
              max={Math.max(matchSkills.length, gapSkills.length, score)}
              theme={theme}
            />
          </View>
        )}

        {/* MATCHING SKILLS */}
        <AppText weight="bold" size={18} style={styles.sectionTitle}>
          Habilidades Corretas
        </AppText>
        {matchSkills.map((s: any, i: number) => (
          <AppText key={i} color="#22C55E" style={{ marginBottom: 4 }}>
            • {s.name}
          </AppText>
        ))}

        {/* GAP SKILLS */}
        <AppText weight="bold" size={18} style={styles.sectionTitle}>
          Habilidades a Melhorar
        </AppText>
        {gapSkills.map((s: any, i: number) => (
          <AppText key={i} color="#EF4444" style={{ marginBottom: 4 }}>
            • {s.name}
          </AppText>
        ))}

        <PrimaryButton
          title="Voltar"
          onPress={() => navigation.goBack()}
          style={{ marginTop: theme.spacing(3) }}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

/* =======================
        STYLES
======================= */

const createStyles = (theme: any) =>
  StyleSheet.create({
    scroll: {
      padding: theme.spacing(3),
      paddingBottom: 40,
    },
    title: {
      textAlign: "center",
      marginBottom: theme.spacing(3),
    },
    toggleContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
      marginBottom: theme.spacing(2),
    },
    toggleButton: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    toggleActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    scoreCard: {
      padding: theme.spacing(3),
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      alignItems: "center",
      marginBottom: theme.spacing(3),
    },
    chartWrapper: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing(3),
    },
    chartScoreText: {
      position: "absolute",
      color: theme.colors.textPrimary,
    },
    barsWrapper: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing(2),
      borderRadius: theme.radius.md,
      marginBottom: theme.spacing(3),
    },
    sectionTitle: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
  });
