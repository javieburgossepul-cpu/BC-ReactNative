import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Item } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

interface ItemCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

export function ItemCard({
  item,
  onPress,
}: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      <Text style={styles.itemName}>{item.name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.fieldText}>
          Artista: {item.artist}
        </Text>

        <Text style={styles.fieldText}>
          Año: {item.year}
        </Text>

        <Text style={styles.fieldText}>
          Ubicación: {item.room}
        </Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.room}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },

  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },

  infoContainer: {
    gap: SPACING.xs,
  },

  fieldText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },

  badge: {
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentDim,
  },

  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
  },
});

