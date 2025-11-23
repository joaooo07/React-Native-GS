// src/screens/Resumes/ResumeFormScreen.tsx

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";

import { ScreenContainer } from "@/components/Layout/ScreenContainer";
import { TextField } from "@/components/UI/TextField";
import { PrimaryButton } from "@/components/UI/PrimaryButton";

import { createResume, updateResume, Resume, ResumePayload } from "@/services/resumeService";

import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/useAuth";
import { useNavigation, useRoute } from "@react-navigation/native";

// DESIGN SYSTEM
import { AppCard } from "@/components/DesignSystem/AppCard";

export const ResumeFormScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useAuth();

  const navigation: any = useNavigation();
  const route = useRoute<any>();

  const editingResume: Resume | null = route.params?.resume || null;
  const isEditing = !!editingResume;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Quando está editando → carregar dados do currículo
  useEffect(() => {
    if (isEditing && editingResume) {
      setTitle(editingResume.title);
      setDescription(editingResume.description);
    }
  }, [editingResume]);

  const handleSave = async () => {
    if (!title || !description) {
      Alert.alert("Campos obrigatórios", "Preencha título e conteúdo.");
      return;
    }

    const payload: ResumePayload = {
      title,
      description,
    };

    try {
      setLoading(true);

      if (isEditing) {
        await updateResume(editingResume!.id, payload);
      } else {
        await createResume(payload);
      }

      navigation.goBack();
    } catch (err) {
      console.log("Erro ao salvar currículo:", err);
      Alert.alert("Erro", "Não foi possível salvar o currículo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>
          {isEditing ? "Editar Currículo" : "Novo Currículo"}
        </Text>

        <AppCard style={styles.form}>
          <TextField label="Título" value={title} onChangeText={setTitle} />

          <TextField
            label="Conteúdo"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={8}
            containerStyle={{
              minHeight: 180,
            }}
            inputStyle={{
              textAlignVertical: "top",
              paddingTop: 8,
            }}
          />



          <PrimaryButton
            title={loading ? "Salvando..." : isEditing ? "Salvar Alterações" : "Criar Currículo"}
            disabled={loading}
            onPress={handleSave}
            style={{ marginTop: theme.spacing(3) }}
          />
        </AppCard>
      </ScrollView>
    </ScreenContainer>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    scroll: {
      padding: theme.spacing(3),
      paddingBottom: 40,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 24,
      fontWeight: "700",
      marginBottom: theme.spacing(3),
      textAlign: "center",
    },
    form: {
      width: "100%",
      alignSelf: "center",
      padding: 24,
      borderRadius: 20,

      // 🔥 AUMENTA O CARD DE VERDADE
      minHeight: 400,  
      justifyContent: "center",

      // 🔥 Faz ocupar praticamente toda a largura no mobile
      marginHorizontal: 0,

      // 🔥 E deixa o card BELÍSSIMO
      maxWidth: 650, // funciona no web, tablet etc
    },

  });
