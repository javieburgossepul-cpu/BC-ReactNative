import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ListRenderItem,
} from 'react-native';

import { Item } from '../types';
import { ITEMS } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

export function HomeScreen(): React.JSX.Element {
  // ============================================
  // ESTADO DE BÚSQUEDA
  // ============================================

  const [query, setQuery] = useState<string>('');

  // ============================================
  // FILTRADO CON useMemo
  // ============================================

  const filteredItems = useMemo<Item[]>(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === '') {
      return ITEMS;
    }

    return ITEMS.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  // ============================================
  // EMPTY STATE
  // ============================================

  const renderEmpty = useCallback(
    (): React.JSX.Element => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Sin resultados para "{query}"
        </Text>

        <Text style={styles.emptySubText}>
          Intenta buscar otra obra de arte por su nombre.
        </Text>
      </View>
    ),
    [query],
  );

  // ============================================
  // RENDER ITEM
  // ============================================

  const renderItem: ListRenderItem<Item> = useCallback(
    ({ item }) => (
      <ItemCard
        item={item}
        onPress={() => {
          // Acción preparada para futuras funcionalidades.
        }}
      />
    ),
    [],
  );

  // ============================================
  // RENDER PRINCIPAL
  // ============================================

  return (
    <KeyboardAvoidingView
      style={styles.kvContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.title}>Museo de Arte</Text>

            <Text style={styles.subtitle}>
              Explora nuestra colección
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar una obra de arte..."
              placeholderTextColor={COLORS.textMuted}
              value={query}
              onChangeText={setQuery}
              keyboardType="default"
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>

          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kvContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  inner: {
    flex: 1,
  },

  header: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },

  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },

  subtitle: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },

  searchContainer: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },

  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },

  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },

  separator: {
    height: 1,
    marginHorizontal: SPACING.base,
    backgroundColor: COLORS.borderLight,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: SPACING.xxl,
  },

  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },

  emptySubText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
