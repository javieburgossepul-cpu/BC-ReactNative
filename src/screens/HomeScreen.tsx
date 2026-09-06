// src/screens/HomeScreen.tsx
// Lista de ítems con pull-to-refresh y acceso a Create / Edit.
// Esta pantalla ya está funcional — no requiere TODOs.

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { useItems } from '../hooks/useItems';
import type { Item } from '../types';
import type { RootStackParamList } from '../navigation/types';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// ──────────────────────────────────────────────
// PANTALLA
// ──────────────────────────────────────────────

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();
  const { data, isLoading, isError, isFetching, refetch } = useItems();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar la lista</Text>
        <Pressable style={styles.retryBtn} onPress={() => void refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data ?? []}
      keyExtractor={(item) => String(item.id)}
      refreshing={isFetching && !isLoading}
      onRefresh={refetch}
      ListEmptyComponent={<Text style={styles.empty}>No hay obras en la galería aún</Text>}
      ListHeaderComponent={
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Museo de Arte</Text>
            <Text style={styles.headerSubtitle}>Colección de Obras Maestras</Text>
          </View>
          {data?.length ? (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{data.length} {data.length === 1 ? 'obra' : 'obras'}</Text>
            </View>
          ) : null}
        </View>
      }
      renderItem={({ item }) => (
        <ItemRow
          item={item}
          onPress={() =>
            navigation.navigate('Edit', { id: item.id, name: item.title })
          }
        />
      )}
    />
  );
}

// ──────────────────────────────────────────────
// SUB-COMPONENTE: fila de obra de arte
// ──────────────────────────────────────────────

interface ItemRowProps { item: Item; onPress: () => void }

function ItemRow({ item, onPress }: ItemRowProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
    >
      <View style={styles.rowLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>{item.title.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.rowArtist} numberOfLines={1}>
            {item.artist || 'Maestro Anónimo'}{item.year ? ` • ${item.year}` : ''}
          </Text>
          {item.room ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.room}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

// ──────────────────────────────────────────────
// ESTILOS
// ──────────────────────────────────────────────

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.sm, paddingBottom: SPACING.xxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerTitle: { ...TYPOGRAPHY.h2, fontSize: 22 },
  headerSubtitle: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, marginTop: 2 },
  countBadge: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  countBadgeText: { ...TYPOGRAPHY.label, color: COLORS.accent },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md, backgroundColor: COLORS.background },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.errorLight },
  retryBtn: { backgroundColor: COLORS.accent, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.sm },
  retryText: { ...TYPOGRAPHY.body, fontWeight: '600', color: COLORS.text },
  empty: { ...TYPOGRAPHY.caption, textAlign: 'center', marginTop: SPACING.xxl },
  row: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  rowPressed: {
    borderColor: COLORS.accent,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, flex: 1 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarLetter: { ...TYPOGRAPHY.h3, color: COLORS.accent },
  rowText: { flex: 1, gap: 2 },
  rowTitle: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.text },
  rowArtist: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginTop: 3,
  },
  badgeText: { ...TYPOGRAPHY.label, fontSize: 11, color: COLORS.accentLight },
  chevron: { fontSize: 22, color: COLORS.textMuted, marginLeft: SPACING.sm },
});
