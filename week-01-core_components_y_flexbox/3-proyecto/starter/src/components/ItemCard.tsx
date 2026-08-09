// ============================================================
// COMPONENT: ItemCard
// ============================================================
// Tarjeta reutilizable para mostrar una obra del museo.
// Este componente se renderiza por cada item en HomeScreen.
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const [favorito, setFavorito] = useState(false);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
    >
      <Image source={item.imageUri} style={styles.cardImage} resizeMode="cover" />

      <View style={styles.cardBody}>
        {/* Fila superior: info a la izquierda, botón de favorito a la derecha */}
        <View style={styles.cardTopRow}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>

          <TouchableOpacity
            style={styles.favButton}
            onPress={() => setFavorito(!favorito)}
            activeOpacity={0.6}
          >
            <Text style={[styles.favIcon, favorito && styles.favIconActivo]}>
              {favorito ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.cardRoom}>{item.room}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardPressed: {
    opacity: 0.7,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardBody: {
    padding: 16,
    gap: 4,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8b949e',
  },
  cardRoom: {
    fontSize: 12,
    color: '#58a6ff',
    marginTop: 2,
  },
  favButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  favIcon: {
    fontSize: 22,
    color: '#8b949e',
  },
  favIconActivo: {
    color: '#f0c419',
  },
});