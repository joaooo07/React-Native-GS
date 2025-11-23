import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";

import { ScreenContainer } from "@/components/Layout/ScreenContainer";
import { PrimaryButton } from "@/components/UI/PrimaryButton";

import { useAuth } from "@/contexts/useAuth";
import { useTheme } from "@/contexts/ThemeContext";

import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { getResumes } from "@/services/resumeService";

import { useFocusEffect } from "@react-navigation/native";


export const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const navigation: any = useNavigation();
  const styles = createStyles(theme);

  const [photo, setPhoto] = useState<string | null>(null);

  const [resumeCount, setResumeCount] = useState<number | null>(null);
  const [analysisCount, setAnalysisCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const loadMetrics = async () => {
    try {
      const resumes = await getResumes();
      setResumeCount(resumes.length);
    } catch {
      setResumeCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);
  useFocusEffect(
  React.useCallback(() => {
    loadMetrics();
  }, [])
);

  const getProfileProgress = () => {
    let progress = 0;

    if (user?.name) progress += 30;
    if (user?.email) progress += 30;
    if (photo) progress += 20;
    if (resumeCount && resumeCount > 0) progress += 20;

    return progress;
  };

  const profileProgress = getProfileProgress();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Personalize")}
          style={styles.settingsBtn}
        >
          <Ionicons
            name="color-palette-outline"
            size={26}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons
              name="person"
              size={48}
              color={theme.colors.textSecondary}
            />
          </View>
        )}

        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
          <Ionicons name="camera" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações Pessoais</Text>

        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{user?.name || "Usuário"}</Text>

        <View style={{ height: 12 }} />

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meu Progresso</Text>

        {loading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <MaterialIcons
                name="check-circle"
                size={30}
                color={theme.colors.primary}
              />
              <Text style={styles.statValue}>{profileProgress}%</Text>
              <Text style={styles.statLabel}>Perfil Completo</Text>
            </View>

            <View style={styles.statBox}>
              <FontAwesome5
                name="file-alt"
                size={26}
                color={theme.colors.primary}
              />
              <Text style={styles.statValue}>{resumeCount}</Text>
              <Text style={styles.statLabel}>Currículos</Text>
            </View>

            <View style={styles.statBox}>
              <MaterialIcons
                name="work-outline"
                size={26}
                color={theme.colors.primary}
              />
              <Text style={styles.statValue}>{analysisCount}</Text>
              <Text style={styles.statLabel}>Vagas Analisadas</Text>
            </View>
          </View>
        )}
      </View>

      <PrimaryButton
        title="Sair"
        onPress={signOut}
        style={{ marginTop: theme.spacing(4) }}
      />
    </ScreenContainer>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 26,
      fontWeight: "600",
    },
    settingsBtn: {
      padding: 4,
    },

    avatarContainer: {
      alignSelf: "center",
      marginBottom: theme.spacing(3),
    },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 55,
    },
    avatarPlaceholder: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.colors.textSecondary,
    },
    editButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      elevation: 3,
    },

    card: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing(3),
      borderRadius: theme.radius.md,
      marginBottom: theme.spacing(2),
    },
    cardTitle: {
      color: theme.colors.textPrimary,
      fontSize: 18,
      fontWeight: "600",
      marginBottom: theme.spacing(2),
    },

    label: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      marginTop: theme.spacing(1),
    },
    value: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: "500",
    },

    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing(1),
    },
    statBox: {
      flex: 1,
      alignItems: "center",
      gap: 4,
    },
    statValue: {
      color: theme.colors.textPrimary,
      fontSize: 18,
      fontWeight: "700",
    },
    statLabel: {
      color: theme.colors.textSecondary,
      fontSize: 13,
      textAlign: "center",
    },
  });
