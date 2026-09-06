// src/hooks/useItems.ts
// Custom hooks para CRUD de obras de arte usando TanStack Query + Axios

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateItemPayload, Item, UpdateItemPayload } from '../types';

export const ITEMS_QUERY_KEY = ['items'] as const;

// ─────────────────────────────────────────
// OBRAS DE ARTE SEMILLA DEL MUSEO
// ─────────────────────────────────────────
const MUSEUM_SEED_ARTWORKS: Item[] = [
  {
    id: 1,
    title: 'La Mona Lisa',
    artist: 'Leonardo da Vinci',
    year: 1503,
    room: 'Sala 6 - Pintura Renacentista',
    body: 'Retrato renacentista de Lisa Gherardini en Florencia. Destaca por el sfumato y su enigmática introspección psicológica; Da Vinci la llevó a Francia, donde la adquirió Francisco I.',
  },
  {
    id: 2,
    title: 'La noche estrellada',
    artist: 'Vincent van Gogh',
    year: 1889,
    room: 'Sala 3 - Posimpresionismo',
    body: 'Pintada en el sanatorio psiquiátrico de Saint-Rémy tras su crisis en Arlés. Pionera del posimpresionismo por expresar su estado emocional mediante cielos arremolinados y colores intensos.',
  },
  {
    id: 3,
    title: 'El grito',
    artist: 'Edvard Munch',
    year: 1893,
    room: 'Sala 2 - Expresionismo',
    body: 'Inspirada en una súbita crisis de ansiedad del pintor en Oslo. Es el ícono fundacional del expresionismo, plasmando la angustia y la soledad del ser humano moderno.',
  },
  {
    id: 4,
    title: 'Guernica',
    artist: 'Pablo Picasso',
    year: 1937,
    room: 'Sala 8 - Arte Moderno',
    body: 'Encargada por la República Española durante la Guerra Civil para denunciar el bombardeo sobre la villa vasca de Guernica. Símbolo antibélico universal.',
  },
  {
    id: 5,
    title: 'Las meninas',
    artist: 'Diego Velázquez',
    year: 1656,
    room: 'Sala 12 - Barroco Español',
    body: 'Retrata a la infanta Margarita en el Alcázar de Madrid. Cumbre del Barroco español por incluir al propio pintor y usar un espejo de fondo que refleja a los reyes.',
  },
  {
    id: 6,
    title: 'La persistencia de la memoria',
    artist: 'Salvador Dalí',
    year: 1931,
    room: 'Sala 9 - Surrealismo',
    body: 'Obra clave del surrealismo con sus icónicos «relojes blandos» en la costa de Portlligat. Simboliza la relatividad del tiempo y el subconsciente freudiano.',
  },
  {
    id: 7,
    title: 'El nacimiento de Venus',
    artist: 'Sandro Botticelli',
    year: 1485,
    room: 'Sala 5 - Renacimiento Temprano',
    body: 'Pintada en la Florencia de los Médici, representa la llegada de la diosa pagana a la costa. Recuperó la mitología clásica y el desnudo de gran formato.',
  },
  {
    id: 8,
    title: 'La creación de Adán',
    artist: 'Miguel Ángel',
    year: 1512,
    room: 'Sala 4 - Capilla y Frescos',
    body: 'Fresco del Génesis en la bóveda de la Capilla Sixtina encargado por el papa Julio II. Sus manos a punto de tocarse sintetizan el humanismo renacentista.',
  },
  {
    id: 9,
    title: 'La joven de la perla',
    artist: 'Johannes Vermeer',
    year: 1665,
    room: 'Sala 11 - Edad de Oro Holandesa',
    body: 'Obra maestra del Siglo de Oro neerlandés en Delft. Un tronie que resalta por el magistral uso de la luz y el destello del pendiente de perla.',
  },
  {
    id: 10,
    title: 'La ronda de noche',
    artist: 'Rembrandt van Rijn',
    year: 1642,
    room: 'Sala 10 - Gran Galería Holandesa',
    body: 'Encargo de la milicia cívica de Ámsterdam. Rompió con los retratos corporativos estáticos al capturar a los guardias en pleno movimiento usando un dramático claroscuro.',
  },
];

// Obras creadas o modificadas localmente en memoria durante la sesión
let localItemsMap: Record<number, Item> = {};
let localCreatedList: Item[] = [];

// ─────────────────────────────────────────
// READ — lista de obras
// ─────────────────────────────────────────
export function useItems() {
  return useQuery<Item[]>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<Array<{ id: number; title: string; body: string }>>('/posts?_limit=10');
        const apiArtworks: Item[] = data.map((post, index) => {
          if (localItemsMap[post.id]) {
            return localItemsMap[post.id];
          }
          const seed = MUSEUM_SEED_ARTWORKS[index % MUSEUM_SEED_ARTWORKS.length];
          return {
            id: post.id,
            title: seed ? seed.title : post.title,
            artist: seed ? seed.artist : 'Maestro Anónimo',
            year: seed ? seed.year : 1900 + (post.id * 7) % 120,
            room: seed ? seed.room : `Sala ${(post.id % 12) + 1}`,
            body: seed?.body ?? post.body,
          };
        });

        return [...localCreatedList, ...apiArtworks];
      } catch {
        const seeds = MUSEUM_SEED_ARTWORKS.map(s => localItemsMap[s.id] || s);
        return [...localCreatedList, ...seeds];
      }
    },
    staleTime: 1000 * 60 * 2,
  });
}

// ─────────────────────────────────────────
// READ — obra individual por ID
// ─────────────────────────────────────────
export function useItemById(id: number | string) {
  const queryClient = useQueryClient();
  const numId = Number(id);

  return useQuery<Item>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: async () => {
      if (localItemsMap[numId]) {
        return localItemsMap[numId];
      }
      const createdItem = localCreatedList.find(item => String(item.id) === String(id));
      if (createdItem) return createdItem;

      const cached = queryClient.getQueryData<Item[]>(ITEMS_QUERY_KEY);
      const inCache = cached?.find(item => String(item.id) === String(id));
      if (inCache) return inCache;

      const seedIndex = isNaN(numId) ? 0 : (numId - 1) % MUSEUM_SEED_ARTWORKS.length;
      const seed = MUSEUM_SEED_ARTWORKS[seedIndex >= 0 ? seedIndex : 0];
      return seed || {
        id: numId,
        title: `Obra de Arte #${numId}`,
        artist: 'Maestro Anónimo',
        year: 1900,
        room: 'Sala General',
        body: 'Descripción de la obra.',
      };
    },
    enabled: !!id,
  });
}

// ─────────────────────────────────────────
// CREATE — registrar obra
// ─────────────────────────────────────────
export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, CreateItemPayload>({
    mutationFn: async (payload) => {
      try {
        await apiClient.post('/posts', payload);
      } catch {
        // Mock fallback
      }

      const newItem: Item = {
        id: Date.now(),
        title: payload.title,
        artist: payload.artist || 'Artista Contemporáneo',
        year: payload.year || new Date().getFullYear(),
        room: payload.room || 'Sala de Nuevas Adquisiciones',
        body: payload.body || '',
      };

      localCreatedList = [newItem, ...localCreatedList];
      localItemsMap[newItem.id] = newItem;
      return newItem;
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData<Item[]>(ITEMS_QUERY_KEY, (old) => (old ? [newItem, ...old] : [newItem]));
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}

// ─────────────────────────────────────────
// UPDATE — editar obra
// ─────────────────────────────────────────
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, UpdateItemPayload>({
    mutationFn: async (payload) => {
      try {
        await apiClient.put(`/posts/${payload.id}`, payload);
      } catch {
        // Mock fallback
      }

      const updatedItem: Item = {
        id: payload.id,
        title: payload.title,
        artist: payload.artist || 'Artista Contemporáneo',
        year: payload.year || new Date().getFullYear(),
        room: payload.room || 'Sala General',
        body: payload.body || '',
      };

      localItemsMap[payload.id] = updatedItem;
      localCreatedList = localCreatedList.map(item => item.id === payload.id ? updatedItem : item);
      return updatedItem;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Item[]>(ITEMS_QUERY_KEY, (old) =>
        old ? old.map((item) => (item.id === updated.id ? updated : item)) : [updated],
      );
      queryClient.setQueryData<Item>([...ITEMS_QUERY_KEY, updated.id], updated);
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...ITEMS_QUERY_KEY, updated.id] });
    },
  });
}
