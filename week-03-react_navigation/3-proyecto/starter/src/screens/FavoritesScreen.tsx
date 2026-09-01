// src/screens/FavoritesScreen.tsx
// Segunda pestaña del Tab Navigator.
// Muestra la lista de obras de arte marcadas como favoritas en el museo.

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { FAVORITES } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';

export function FavoritesScreen(): React.JSX.Element {
  /**
   * Renderiza cada obra favorita en una tarjeta destacada.
   */
  function renderFavorite({ item }: { item: Item }): React.JSX.Element {
    return (
      <View style={styles.card}>
        <View style={styles.heartContainer}>
          <Text style={styles.heartIcon}>♥</Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.yearText}>{item.year}</Text>
          </View>

          <Text style={styles.artistText}>{item.artist}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.roomText}>🏛️ {item.room}</Text>
          </View>

          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={FAVORITES}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎨</Text>
            <Text style={styles.emptyText}>
              No tienes obras favoritas guardadas todavía.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.base,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  heartContainer: {
    backgroundColor: '#f8514922',
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  heartIcon: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.error,
  },
  cardContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  yearText: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  artistText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.weight.medium,
    marginBottom: SPACING.xs,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
  },
  roomText: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textSecondary,
  },
  itemDescription: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  separator: {
    height: SPACING.md,
  },
  emptyContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
