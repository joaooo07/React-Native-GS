import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

interface Props {
  visible: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<Props> = ({
  visible,
  title = "Confirmar ação",
  message = "Tem certeza?",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <View />

        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View />
      </Pressable>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      padding: 24,
    },
    modalContainer: {
      backgroundColor: theme.colors.surface,
      padding: 20,
      borderRadius: 14,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 8,
    },
    message: {
      color: theme.colors.textSecondary,
      marginBottom: 20,
      fontSize: 16,
    },
    buttonsRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 12,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    cancelButton: {
      backgroundColor: theme.colors.surfaceSecondary,
    },
    confirmButton: {
      backgroundColor: theme.colors.error,
    },
    cancelText: {
      color: theme.colors.textPrimary,
      fontWeight: "600",
    },
    confirmText: {
      color: "#fff",
      fontWeight: "700",
    },
  });
