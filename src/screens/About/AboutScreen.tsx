import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

import { ScreenContainer } from "@/components/Layout/ScreenContainer";
import { useTheme } from "@/contexts/ThemeContext";

import { AppCard } from "@/components/DesignSystem/AppCard";
import { AppText } from "@/components/DesignSystem/AppText";

import { Ionicons } from "@expo/vector-icons";

export const AboutScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const APP_NAME = "CareerLens";
  const VERSION = "1.0.0";
  const REPO_URL = "https://github.com/joaooo07/GS-ReactNative";

  const DEVELOPERS = [
    {
      name: "João Pedro",
      role: " • React Native \n• Dotnet",
      photo: require("@/assets/images/devs/joaoimg.jpg"),
    },
    {
      name: "Guilherme Cardoso",
      role: "• Java \n• QA",
      photo: require("@/assets/images/devs/cardosofoto.jpeg"),
    },
    {
      name: "Hassan Chahine",
      role: "• DevOPS \n• Banco de Dados \n• IOT",
      photo: require("@/assets/images/devs/hassanfoto.png"),
    },
  ];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <AppText size={26} weight="bold">
          Sobre o App
        </AppText>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo-variante.png")}
          style={styles.logo}
        />
      </View>

      <AppCard style={styles.card}>
        <AppText weight="bold" size={18} style={{ marginBottom: 10 }}>
          {APP_NAME}
        </AppText>

        <AppText size={15} style={{ marginBottom: 4 }}>
          Versão: <AppText weight="bold">{VERSION}</AppText>
        </AppText>

        <TouchableOpacity onPress={() => Linking.openURL(REPO_URL)}>
          <AppText size={15} color={theme.colors.primary}>
            <Ionicons name="logo-github" size={16} /> Acessar Repositório
          </AppText>
        </TouchableOpacity>
      </AppCard>


      <AppCard style={styles.card}>
        <AppText weight="bold" size={18} style={{ marginBottom: 10 }}>
          Desenvolvedores
        </AppText>

        {DEVELOPERS.map((dev, index) => (
          <View key={index} style={styles.devRow}>
            <Image source={dev.photo} style={styles.devPhoto} />

            <View style={styles.devInfo}>
              <AppText weight="bold" size={16}>
                {dev.name}
              </AppText>

              <AppText size={14} color={theme.colors.textSecondary}>
                {dev.role}
              </AppText>
            </View>
          </View>
        ))}
      </AppCard>

      <View style={{ marginTop: theme.spacing(4), alignItems: "center" }}>
        <AppText size={13} color={theme.colors.textSecondary}>
          © {new Date().getFullYear()} — Todos os direitos reservados.
        </AppText>
      </View>
    </ScreenContainer>
  );
};


const createStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      marginBottom: theme.spacing(2),
    },

    logoContainer: {
      alignSelf: "center",
      marginBottom: theme.spacing(3),
    },
    logo: {
      width: 110,
      height: 110,
      resizeMode: "contain",
      opacity: 0.9,
    },


    card: {
      marginBottom: theme.spacing(2),
    },

    devRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: theme.spacing(1.5),
    },
    devPhoto: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 12,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    devInfo: {
      flex: 1,
    },
  });
