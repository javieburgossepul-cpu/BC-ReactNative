// src/types/index.ts
// Define los tipos de datos del dominio.
// Dominio asignado: Museo / Obras de arte

// ============================================
// INTERFACE PRINCIPAL DEL DOMINIO
// ============================================

export interface Item {
  id: string;
  name: string;
  artist: string;
  year: number;
  room: string;
  description: string;
  technique: string;
  period: string;
}
