// src/screens/HomeScreen.tsx
// Pantalla principal: lista de obras de arte del museo con navegación al detalle.

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';
import { useSavedStore } from '../stores/savedStore';

type HomeScreenNavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

// ============================================================
// SUB-COMPONENTE: ItemCard
// ============================================================

interface ItemCardProps {
  item: Item;
  isSaved: boolean;
  onPress: () => void;
  onToggleSave: () => void;
}

function ItemCard({ item, isSaved, onPress, onToggleSave }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      testID={`item-card-${item.id}`}
    >
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>{item.name.charAt(0)}</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            hitSlop={8}
            style={styles.bookmarkBtn}
          >
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isSaved ? COLORS.accent : COLORS.textMuted}
            />
          </Pressable>
        </View>

        <Text style={styles.artistText}>
          {item.artist} • {item.year}
        </Text>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.room}</Text>
          </View>
          <View style={[styles.badge, styles.periodBadge]}>
            <Text style={[styles.badgeText, styles.periodBadgeText]}>{item.period}</Text>
          </View>
        </View>

        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );
}

// ============================================================
// PANTALLA: HomeScreen
// ============================================================

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavProp>();
  const savedItems = useSavedStore((state) => state.items);
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  const items = ITEMS;

  const renderItem: ListRenderItem<Item> = ({ item }) => {
    const isSaved = savedItems.some((s) => s.id === item.id);
    return (
      <ItemCard
        item={item}
        isSaved={isSaved}
        onPress={() =>
          navigation.navigate('HomeDetail', { id: item.id, name: item.name })
        }
        onToggleSave={() => {
          if (isSaved) {
            removeItem(item.id);
          } else {
            addItem(item);
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.sectionLabel}>
              Colección Permanente ({items.length} obras maestras)
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay obras de arte disponibles.</Text>
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
  },
  header: {
    marginBottom: SPACING.sm,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  separator: {
    height: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  cardPressed: {
    opacity: 0.7,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  thumbnailText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.accent,
  },
  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    flex: 1,
  },
  bookmarkBtn: {
    paddingLeft: SPACING.xs,
  },
  artistText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginVertical: 2,
  },
  badge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  periodBadge: {
    borderColor: '#d2992240',
    backgroundColor: '#d2992215',
  },
  periodBadgeText: {
    color: COLORS.warning,
  },
  cardDescription: {
    ...TYPOGRAPHY.caption,
    lineHeight: 18,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.xl,
    color: COLORS.textSecondary,
  },
});

