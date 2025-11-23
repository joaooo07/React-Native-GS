// src/screens/Compatibility/CompatibilityScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { ScreenContainer } from "@/components/Layout/ScreenContainer";
import { TextField } from "@/components/UI/TextField";
import { PrimaryButton } from "@/components/UI/PrimaryButton";

import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/useAuth";

import { getResumes, Resume } from "@/services/resumeService";
import { runAnalysis, getAnalysisResult } from "@/services/compatibilityService";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export const CompatibilityScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useAuth();
  const navigation: any = useNavigation();

  const [loadingResumes, setLoadingResumes] = useState(true);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------------------- LOAD RESUMES -------------------- */
  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    if (!user) return;

    setLoadingResumes(true);
    try {
      const data = await getResumes();
      setResumes(data);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar seus currículos.");
    } finally {
      setLoadingResumes(false);
    }
  };

  /* -------------------- RUN ANALYSIS (POST → GET → NAVIGATE) -------------------- */
  const handleAnalyze = async () => {
    if (!selectedResume) {
      Alert.alert("Selecione um currículo");
      return;
    }
    if (!jobTitle || !jobDescription) {
      Alert.alert("Preencha o título e descrição da vaga.");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Cria análise
      const created = await runAnalysis({
        jobTitle,
        jobDescription,
        idResume: selectedResume,
      });

      const analysisId = created.id;
      if (!analysisId) throw new Error("API não retornou ID da análise.");

      // 2️⃣ Busca o resultado REAL imediatamente
      const finalResult = await getAnalysisResult(analysisId);

      // 3️⃣ Navega direto para a tela de resultado
      navigation.navigate("AnalysisResult", finalResult);

    } catch (err) {
      console.log("❌ Erro na análise:", err);
      Alert.alert("Erro", "A análise falhou. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- LOADING -------------------- */
  if (loadingResumes) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </ScreenContainer>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Análise de Compatibilidade</Text>

        {/* CURRÍCULO SELECT */}
        <View style={styles.section}>
          <Text style={styles.label}>Selecione o currículo</Text>

          <TouchableOpacity
            onPress={() => setDropdownOpen(!dropdownOpen)}
            style={styles.dropdownButton}
          >
            <Text style={styles.dropdownText}>
              {selectedResume
                ? resumes.find((r) => r.id === selectedResume)?.title
                : "Selecione um currículo"}
            </Text>

            <Ionicons
              name={dropdownOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdownList}>
              {resumes.map((r) => (
                <TouchableOpacity
                  key={r.id}
                  onPress={() => {
                    setSelectedResume(r.id);
                    setDropdownOpen(false);
                  }}
                  style={[
                    styles.dropdownItem,
                    selectedResume === r.id && styles.dropdownItemSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedResume === r.id &&
                        styles.dropdownItemTextSelected,
                    ]}
                  >
                    {r.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TextField
          label="Título da vaga"
          value={jobTitle}
          onChangeText={setJobTitle}
        />

        <TextField
          label="Descrição da vaga"
          value={jobDescription}
          onChangeText={setJobDescription}
          multiline
        />

        <PrimaryButton
          title={loading ? "Analisando..." : "Analisar Vaga"}
          onPress={handleAnalyze}
          disabled={loading}
          style={{ marginTop: theme.spacing(3) }}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

/* -------------------- STYLES -------------------- */
const createStyles = (theme: any) =>
  StyleSheet.create({
    scroll: {
      padding: theme.spacing(3),
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 24,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: theme.spacing(3),
    },
    section: {
      marginBottom: theme.spacing(3),
    },
    label: {
      color: theme.colors.textPrimary,
      fontSize: 15,
      marginBottom: theme.spacing(1),
    },
    dropdownButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dropdownText: {
      color: theme.colors.textPrimary,
      fontSize: 15,
    },
    dropdownList: {
      marginTop: 6,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: "hidden",
    },
    dropdownItem: {
      padding: 12,
    },
    dropdownItemSelected: {
      backgroundColor: theme.colors.primary + "22",
    },
    dropdownItemText: {
      color: theme.colors.textPrimary,
      fontSize: 15,
    },
    dropdownItemTextSelected: {
      fontWeight: "700",
      color: theme.colors.primary,
    },
  });
