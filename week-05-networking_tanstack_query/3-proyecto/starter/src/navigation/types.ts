// src/navigation/types.ts
// Tipos tipados de la navegación para el Stack Navigator.

export type RootStackParamList = {
  // Pantalla principal: Galería de Obras de Arte
  Home: undefined;
  // Ficha técnica: recibe el id y el nombre de la obra para el Header
  Detail: { id: string | number; name: string };
  // Modal para agregar una nueva obra de arte
  Create: undefined;
};
