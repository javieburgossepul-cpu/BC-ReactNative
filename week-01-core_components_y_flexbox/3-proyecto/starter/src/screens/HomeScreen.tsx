// ============================================================
// SCREEN: HomeScreen
// ============================================================
// Pantalla principal: header con el nombre del dominio
// y lista de tarjetas usando ScrollView.
// ============================================================

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Item } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';

export function HomeScreen(): React.JSX.Element {
  const DOMAIN_TITLE = 'Museo Nacional';
  const DOMAIN_SUBTITLE = 'Colección permanente';

  /**
   * Handles item card press.
   * For now, just logs the item name. In week-03 we'll add navigation.
   */
  function handleItemPress(item: Item): void {
    console.log('Item seleccionado:', item.name);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      {/* Header: título/subtítulo a la izquierda, contador a la derecha */}
      <View style={styles.header}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
          <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{MOCK_ITEMS.length} obras</Text>
        </View>
      </View>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_ITEMS.map((item) => (
          <ItemCard key={item.id} item={item} onPress={handleItemPress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  headerTextGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8b949e',
    marginTop: 4,
  },
  countBadge: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#58a6ff',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});