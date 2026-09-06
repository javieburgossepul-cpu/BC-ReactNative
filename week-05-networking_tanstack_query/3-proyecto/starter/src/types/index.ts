// src/types/index.ts
// Interface del dominio Museo / Obras de arte para la Semana 05 (TanStack Query + API).

export interface Item {
  id: string | number;
  name: string;
  artist: string;
  year: number;
  room: string;
  technique: string;
  period: string;
  description: string;
}

// Payload para crear una nueva obra de arte mediante POST con useMutation
export type CreateItemPayload = Omit<Item, 'id'>;

// Interfaz para la respuesta cruda de la API (en caso de usar JSONPlaceholder /posts)
export interface ApiPost {
  id: number;
  title: string;
  body: string;
  userId?: number;
}
