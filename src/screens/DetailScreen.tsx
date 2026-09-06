// src/screens/DetailScreen.tsx
// Pantalla de detalle: muestra la información completa de la obra de arte
// y permite guardarla / quitarla usando el store global de Zustand.

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';
import { useSavedStore } from '../stores/savedStore';
import { ITEMS } from '../data/mockData';
import type { Item } from '../types';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

// ============================================================
// PANTALLA: DetailScreen
// ============================================================

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;

  // Buscar el ítem completo en ITEMS
  const item: Item | undefined = ITEMS.find((i) => i.id === id);

  // Selectores de Zustand
  const isSaved = useSavedStore((state) => state.items.some((i) => i.id === id));
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  const handleToggleSave = (): void => {
    if (isSaved) {
      removeItem(id);
    } else if (item) {
      addItem(item);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero Thumbnail */}
      <View style={styles.hero}>
        <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
      </View>

      {/* Información principal */}
      <View style={styles.info}>
        <Text style={styles.title}>{item?.name ?? name}</Text>
        <Text style={styles.artist}>{item?.artist} • {item?.year}</Text>

        {/* Ficha técnica */}
        <View style={styles.specCard}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Ubicación:</Text>
            <Text style={styles.specValue}>{item?.room ?? 'Sala Principal'}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Técnica:</Text>
            <Text style={styles.specValue}>{item?.technique ?? 'N/D'}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Periodo:</Text>
            <Text style={styles.specValue}>{item?.period ?? 'N/D'}</Text>
          </View>
        </View>

        {/* Descripción */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionHeading}>Acerca de la obra</Text>
          <Text style={styles.description}>
            {item?.description ?? 'Sin descripción disponible para esta obra.'}
          </Text>
        </View>
      </View>

      {/* ──────────────────────────────────────────────────── */}
      {/* BOTÓN GUARDAR / QUITAR — conectado al store Zustand  */}
      {/* ──────────────────────────────────────────────────── */}
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          isSaved && styles.saveButtonActive,
          pressed && styles.saveButtonPressed,
        ]}
        onPress={handleToggleSave}
        testID="save-button"
      >
        <Ionicons
          name={isSaved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={isSaved ? COLORS.background : COLORS.accent}
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
          {isSaved ? 'Guardada en Colección' : 'Guardar en Favoritos'}
        </Text>
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
  contentContainer: {
    padding: SPACING.lg,
    gap: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  hero: {
    width: 110,
    height: 110,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroLetter: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.accent,
  },
  info: {
    gap: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h1,
    textAlign: 'center',
  },
  artist: {
    ...TYPOGRAPHY.body,
    color: COLORS.accent,
    textAlign: 'center',
    fontWeight: '600',
  },
  specCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  specLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  specValue: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  descriptionSection: {
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  sectionHeading: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.accent,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  saveButtonActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.accent,
  },
  saveButtonTextActive: {
    color: COLORS.background,
  },
});

