// src/types/index.ts
// Tipos de datos del dominio Museo de Arte

export interface Item {
  id: number;
  title: string;
  artist?: string;
  year?: number;
  room?: string;
  body: string;
  userId?: number;
}

// Payload para crear un ítem nuevo (sin id — lo asigna el servidor)
export interface CreateItemPayload {
  title: string;
  artist?: string;
  year?: number;
  room?: string;
  body: string;
  userId?: number;
}

// Payload para actualizar (id requerido + campos editables)
export interface UpdateItemPayload {
  id: number;
  title: string;
  artist?: string;
  year?: number;
  room?: string;
  body: string;
  userId?: number;
}
