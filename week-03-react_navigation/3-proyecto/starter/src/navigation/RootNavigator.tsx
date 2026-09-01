// src/navigation/RootNavigator.tsx
// Configura la estructura completa de navegación:
//   Tab Navigator (raíz)
//     └── Home tab  → HomeStack (Stack Navigator anidado)
//           ├── HomeList  (lista de obras de arte)
//           └── HomeDetail (detalle de la obra con params)
//     └── Favorites tab → FavoritesScreen

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { DetailScreen } from '../screens/DetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { COLORS } from '../theme';
import type { HomeStackParamList, RootTabParamList } from './types';

// ============================================
// STACK INTERNO — para la pestaña Home
// ============================================

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Navigator que gestiona la navegación dentro de la pestaña Home (Galería).
 * Es un Stack anidado dentro del Tab Navigator.
 */
function HomeStackNavigator(): React.JSX.Element {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.accent,
        headerTitleStyle: { fontWeight: '600', color: COLORS.textPrimary },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      {/* Pantalla inicial del Stack — catálogo de obras */}
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: 'Galería de Arte' }}
      />
      {/* Pantalla de detalle — recibe params del Stack con título dinámico */}
      <HomeStack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </HomeStack.Navigator>
  );
}

// ============================================
// TAB NAVIGATOR — raíz de la app
// ============================================

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'Home') {
            iconName = focused ? 'color-palette' : 'color-palette-outline';
          } else {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
        },
        headerShown: false,
      })}
    >
      {/* Pestaña de Galería con Stack anidado */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Galería' }}
      />
      {/* Pestaña de Favoritos */}
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favoritos',
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.surface },
          headerTintColor: COLORS.accent,
          headerTitleStyle: { fontWeight: '600', color: COLORS.textPrimary },
        }}
      />
    </Tab.Navigator>
  );
}
