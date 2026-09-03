// src/types/index.ts
// Interface principal del dominio Museo / Obras de arte.

export interface Item {
  id: string;
  name: string;
  artist: string;
  year: number;
  room: string;
  technique: string;
  period: string;
  description: string;
}

