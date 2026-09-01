// src/screens/DetailScreen.tsx
// Pantalla de detalle — recibe los datos tipados de la obra seleccionada vía params.

import React from 'react';
import type { NativeStackRouteProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

// Tipo del route hook para leer los params tipados de esta pantalla
type DetailScreenRouteProp = NativeStackRouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<DetailScreenRouteProp>();
  const { id, name, artist, year, room, description, technique, period } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Encabezado con insignias */}
      <View style={styles.badgeRow}>
        <View style={styles.idBadge}>
          <Text style={styles.idBadgeText}>ID #{id}</Text>
        </View>
        <View style={styles.periodBadge}>
          <Text style={styles.periodBadgeText}>{period}</Text>
        </View>
      </View>

      {/* Título de la obra */}
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.artist}>{artist} ({year})</Text>

      {/* Tarjeta de Ubicación en el Museo */}
      <View style={styles.card}>
        <Text style={styles.fieldLabel}>🏛️ Ubicación en el Museo</Text>
        <Text style={styles.fieldValue}>{room}</Text>
      </View>

      {/* Tarjeta de Técnica */}
      <View style={styles.card}>
        <Text style={styles.fieldLabel}>🎨 Técnica y Materiales</Text>
        <Text style={styles.fieldValue}>{technique}</Text>
      </View>

      {/* Tarjeta de Descripción */}
      <View style={styles.card}>
        <Text style={styles.fieldLabel}>📖 Descripción Histórica</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      {/* Botón de retorno */}
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Volver a la Galería</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.base,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'center',
  },
  idBadge: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  idBadgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textSecondary,
  },
  periodBadge: {
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  periodBadgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  artist: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.accent,
    marginBottom: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  descriptionText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  backButtonPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
});
