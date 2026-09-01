// src/navigation/types.ts
// Define los tipos de parámetros para cada navigator.
// Esto habilita autocompletado y verificación estricta en tiempo de compilación.

// ============================================
// TAB NAVIGATOR — pantallas de nivel raíz
// ============================================

export type RootTabParamList = {
  // Pestaña principal con Stack interno (lista → detalle)
  Home: undefined;
  // Pestaña secundaria de favoritos
  Favorites: undefined;
};

// ============================================
// STACK NAVIGATOR — anidado dentro de la pestaña Home
// ============================================

export type HomeStackParamList = {
  // Pantalla de lista de obras (sin params)
  HomeList: undefined;
  // Pantalla de detalle — recibe todos los datos tipados de la obra
  HomeDetail: {
    id: string;
    name: string;
    artist: string;
    year: number;
    room: string;
    description: string;
    technique: string;
    period: string;
  };
};
