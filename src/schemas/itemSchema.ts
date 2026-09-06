// src/schemas/itemSchema.ts
// Schema Zod para el formulario de obras de arte del museo.

import { z } from 'zod';

export const itemSchema = z.object({
  title: z
    .string()
    .min(1, 'El nombre de la obra es requerido')
    .max(80, 'Máximo 80 caracteres'),

  artist: z
    .string()
    .min(1, 'El nombre del artista es requerido')
    .max(80, 'Máximo 80 caracteres'),

  year: z
    .number({ message: 'El año debe ser un número válido' })
    .int('El año debe ser un número entero')
    .min(1, 'El año debe ser mayor a 0')
    .max(new Date().getFullYear(), `El año no puede ser mayor a ${new Date().getFullYear()}`),

  room: z
    .string()
    .max(50, 'Máximo 50 caracteres')
    .optional(),

  body: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional(),
});

// El tipo TypeScript se infiere automáticamente — sin interfaz duplicada
export type ItemFormData = z.infer<typeof itemSchema>;
