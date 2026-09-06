// src/navigation/RootNavigator.tsx
// Stack Navigator con tres pantallas: Galería (Home), Detalle (Detail) y Nueva Obra (Create).

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { COLORS } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTitleStyle: { color: COLORS.textPrimary, fontWeight: '600' },
        headerTintColor: COLORS.accent,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Galería de Arte',
          headerRight: () => (
            <Pressable
              style={styles.addButton}
              onPress={() => navigation.navigate('Create')}
              accessibilityLabel="Agregar nueva obra de arte"
            >
              <Ionicons name="add-circle" size={26} color={COLORS.accent} />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: 'Nueva Obra de Arte',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  addButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
