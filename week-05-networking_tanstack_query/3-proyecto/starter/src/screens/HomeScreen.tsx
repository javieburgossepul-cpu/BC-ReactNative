// src/screens/HomeScreen.tsx
// Pantalla principal: Galería de Obras de Arte conectada a la API mediante TanStack Query v5.

import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { useItems } from '../hooks/useItems';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// ============================================================
// SUB-COMPONENTE: ItemCard
// ============================================================
interface ItemCardProps {
  item: Item;
  onPress: () => void;
}

function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      testID={`item-card-${item.id}`}
    >
      <View style={styles.cardAvatar}>
        <Text style={styles.cardAvatarText}>
          {String(item.name).charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardArtist} numberOfLines={1}>
          {item.artist} • {item.year}
        </Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.room}</Text>
          </View>
          {item.period ? (
            <View style={[styles.badge, styles.periodBadge]}>
              <Text style={styles.periodBadgeText}>{item.period}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
    </Pressable>
  );
}

// ============================================================
// PANTALLA: HomeScreen
// ============================================================
export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();

  // Consumimos el hook useItems de TanStack Query
  const { data, isLoading, isError, isFetching, refetch, error } = useItems();

  const handleCardPress = useCallback(
    (item: Item) => {
      navigation.navigate('Detail', {
        id: item.id,
        name: item.name,
      });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<Item> = useCallback(
    ({ item }) => <ItemCard item={item} onPress={() => handleCardPress(item)} />,
    [handleCardPress]
  );

  // ── Estado de Carga Inicial (First Load) ────────────────────
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando galería de arte desde la API...</Text>
      </View>
    );
  }

  // ── Estado de Error en la Red ───────────────────────────────
  if (isError) {
    return (
      <View style={styles.centered}>
        <Ionicons name="cloud-offline-outline" size={56} color={COLORS.error} />
        <Text style={styles.errorTitle}>Error al cargar las obras</Text>
        <Text style={styles.errorMessage}>
          {error?.message ?? 'No se pudo establecer conexión con el servidor.'}
        </Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Ionicons name="refresh" size={18} color={COLORS.background} />
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshing={isFetching && !isLoading}
        onRefresh={refetch}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Museo Nacional</Text>
              <Text style={styles.headerSubtitle}>Colección de Obras Maestras</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>
                {data?.length ?? 0} {data?.length === 1 ? 'obra' : 'obras'}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="images-outline" size={48} color={COLORS.textMuted} />
            <Text style={styles.emptyTitle}>No hay obras disponibles</Text>
            <Text style={styles.emptySubtitle}>
              Toca el botón + en la parte superior para registrar una obra.
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
  listContent: {
    padding: SPACING.md,
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
    textAlign: 'center',
  },
  errorTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.error,
    textAlign: 'center',
  },
  errorMessage: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    marginTop: SPACING.sm,
  },
  retryButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
    fontSize: 24,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  countBadgeText: {
    ...TYPOGRAPHY.label,
    color: COLORS.accent,
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
  cardPressed: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.accent,
  },
  cardAvatar: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.accent,
  },
  cardContent: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
  },
  cardArtist: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeText: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  periodBadge: {
    borderColor: 'rgba(97, 218, 251, 0.3)',
    backgroundColor: 'rgba(97, 218, 251, 0.1)',
  },
  periodBadgeText: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
    color: COLORS.accent,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    gap: SPACING.xs,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    textAlign: 'center',
    maxWidth: 240,
  },
});
