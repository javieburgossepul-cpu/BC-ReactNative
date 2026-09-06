// src/screens/DetailScreen.tsx
// Pantalla de Ficha Técnica de la Obra de Arte conectada con useItemById().

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { useItemById } from '../hooks/useItems';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailNavProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

// ============================================================
// SUB-COMPONENTE: Fila de Información
// ============================================================
interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
}

function InfoRow({ icon, label, value }: InfoRowProps): React.JSX.Element {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconWrapper}>
        <Ionicons name={icon} size={16} color={COLORS.accent} />
      </View>
      <View style={styles.infoTextGroup}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

// ============================================================
// PANTALLA: DetailScreen
// ============================================================
export function DetailScreen(): React.JSX.Element {
  const navigation = useNavigation<DetailNavProp>();
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;

  // Consulta los datos completos del ítem usando TanStack Query
  const { data: item, isLoading, isError, refetch } = useItemById(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando ficha de la obra...</Text>
      </View>
    );
  }

  if (isError || !item) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={56} color={COLORS.error} />
        <Text style={styles.errorText}>No se pudo cargar la información</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Ionicons name="refresh" size={16} color={COLORS.background} />
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Header */}
      <View style={styles.heroCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.artistSubtitle}>{item.artist}</Text>

        <View style={styles.badgeContainer}>
          <View style={styles.idBadge}>
            <Text style={styles.idBadgeText}>ID: #{item.id}</Text>
          </View>
          <View style={[styles.idBadge, styles.periodBadge]}>
            <Text style={styles.periodBadgeText}>{item.period}</Text>
          </View>
        </View>
      </View>

      {/* Ficha Técnica */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Ficha Técnica</Text>
        <View style={styles.divider} />

        <InfoRow icon="person-outline" label="Artista" value={item.artist} />
        <InfoRow icon="calendar-outline" label="Año de Creación" value={item.year} />
        <InfoRow icon="business-outline" label="Ubicación en Museo" value={item.room} />
        <InfoRow icon="brush-outline" label="Técnica" value={item.technique} />
        <InfoRow icon="time-outline" label="Período Histórico" value={item.period} />
      </View>

      {/* Descripción Histórica */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Descripción Histórica</Text>
        <View style={styles.divider} />
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>

      {/* Botón Volver */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={18} color={COLORS.accent} />
        <Text style={styles.backButtonText}>Volver a la Galería</Text>
      </Pressable>
    </ScrollView>
  );
}

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  errorText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.error,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xs,
  },
  retryButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.background,
  },
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.xs,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  avatarLargeText: {
    fontSize: 34,
    fontWeight: '700',
    color: COLORS.accent,
  },
  title: {
    ...TYPOGRAPHY.h1,
    fontSize: 22,
    textAlign: 'center',
  },
  artistSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  idBadge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  idBadgeText: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  periodBadge: {
    borderColor: 'rgba(97, 218, 251, 0.4)',
    backgroundColor: 'rgba(97, 218, 251, 0.1)',
  },
  periodBadgeText: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
    color: COLORS.accent,
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    gap: SPACING.sm,
  },
  infoIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTextGroup: {
    flex: 1,
  },
  infoLabel: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
    color: COLORS.textMuted,
  },
  infoValue: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  descriptionText: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
  },
  backButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.accent,
    fontWeight: '600',
  },
});
