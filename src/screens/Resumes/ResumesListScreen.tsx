import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';

import { ScreenContainer } from '@/components/Layout/ScreenContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/useAuth';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ConfirmModal } from "@/components/UI/ConfirmModal";

import { 
  getResumes, 
  deleteResume, 
  Resume 
} from '@/services/resumeService';

import { AppCard } from '@/components/DesignSystem/AppCard';

export const ResumesListScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useAuth();
  const navigation: any = useNavigation();

  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [error, setError] = useState('');

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const loadResumes = async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      const data = await getResumes();
      setResumes(data);
    } catch (err) {
      setError("Erro ao carregar currículos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadResumes);
    return unsubscribe;
  }, [navigation]);

  const openDeleteModal = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;


    const ok = await deleteResume(selectedId);


    setShowConfirm(false);
    loadResumes();
  };

  const renderItem = ({ item }: { item: Resume }) => (
    <AppCard style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>
          {item.description.length > 60 
            ? item.description.substring(0, 60) + "..." 
            : item.description}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("ResumeForm", { resume: item })}
        style={styles.iconButton}
      >
        <Ionicons name="create-outline" size={22} color={theme.colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openDeleteModal(item.id)}
        style={styles.iconButton}
      >
        <Ionicons name="trash-outline" size={22} color={theme.colors.error} />
      </TouchableOpacity>
    </AppCard>
  );

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Currículos</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("ResumeForm")}
          style={styles.addButton}
        >
          <Ionicons name="add-circle" size={34} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!loading && resumes.length === 0 && (
        <View style={styles.emptyContainer}>
          <FontAwesome5 name="file-alt" size={42} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>Nenhum currículo encontrado</Text>
        </View>
      )}

      <FlatList
        data={resumes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <ConfirmModal
        visible={showConfirm}
        title="Excluir currículo"
        message="Tem certeza que deseja excluir este currículo? Essa ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </ScreenContainer>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(3),
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 26,
      fontWeight: "700",
    },
    addButton: { padding: 4 },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    cardTitle: {
      color: theme.colors.textPrimary,
      fontSize: 18,
      fontWeight: "600",
    },
    cardSubtitle: {
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    iconButton: { padding: 6 },
    emptyContainer: {
      alignItems: "center",
      marginTop: 40,
    },
    emptyText: {
      color: theme.colors.textSecondary,
      marginTop: theme.spacing(1),
    },
    error: {
      color: theme.colors.error,
      textAlign: "center",
      marginBottom: theme.spacing(2),
    },
  });
