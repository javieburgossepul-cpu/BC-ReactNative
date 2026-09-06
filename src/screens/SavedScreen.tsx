// src/screens/SavedScreen.tsx
// Pantalla de guardados: muestra todas las obras de arte que el usuario guardó.
// Lee el estado directamente desde el useSavedStore (sin props ni prop drilling).
// Demuestra que el mismo store Zustand mantiene consistencia entre tabs.

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import { useSavedStore } from '../stores/savedStore';

// ============================================================
// SUB-COMPONENTE: SavedItem
// ============================================================

interface SavedItemProps {
  item: Item;
  onRemove: () => void;
}

function SavedItem({ item, onRemove }: SavedItemProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>{item.name.charAt(0)}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.artistText}>
          {item.artist} • {item.year}
        </Text>
        <Text style={styles.roomText}>
          {item.room}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.removeButton, pressed && { opacity: 0.6 }]}
        onPress={onRemove}
        accessibilityLabel={`Quitar ${item.name} de guardados`}
      >
        <Ionicons name="trash-outline" size={18} color={COLORS.error} />
      </Pressable>
    </View>
  );
}

// ============================================================
// PANTALLA: SavedScreen
// ============================================================

export function SavedScreen(): React.JSX.Element {
  // Selectores de Zustand
  const items = useSavedStore((state) => state.items);
  const removeItem = useSavedStore((state) => state.removeItem);
  const clearAll = useSavedStore((state) => state.clearAll);

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <SavedItem item={item} onRemove={() => removeItem(item.id)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          items.length > 0 ? (
            <View style={styles.header}>
              <Text style={styles.sectionLabel}>
                {items.length} obra{items.length !== 1 ? 's' : ''} favorita{items.length !== 1 ? 's' : ''}
              </Text>
              <Pressable onPress={clearAll} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Vaciar lista</Text>
              </Pressable>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={64} color={COLORS.textMuted} />
            <Text style={styles.emptyTitle}>Sin obras guardadas</Text>
            <Text style={styles.emptySubtitle}>
              Explora la colección permanente y presiona el botón de guardar en tus obras favoritas.
            </Text>
          </View>
        }
      />
    </View>
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
  list: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  clearButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
    backgroundColor: '#f8514915',
    borderWidth: 1,
    borderColor: '#f8514940',
  },
  clearButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    fontWeight: '600',
  },
  separator: {
    height: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  thumbnailText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.accent,
  },
  cardContent: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
  },
  artistText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
  },
  roomText: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    gap: SPACING.md,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textSecondary,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    lineHeight: 22,
  },
});

