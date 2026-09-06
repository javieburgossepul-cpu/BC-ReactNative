// src/hooks/useItems.ts
// Custom hooks con TanStack Query v5 para interactuar con la API REST del Museo.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { ApiPost, CreateItemPayload, Item } from '../types';

// ============================================================
// DATOS BASE DEL DOMINIO MUSEO (Obras Maestras)
// ============================================================
const MUSEUM_SEED_ARTWORKS: Item[] = [
  {
    id: 1,
    name: 'La Mona Lisa',
    artist: 'Leonardo da Vinci',
    year: 1503,
    room: 'Sala 6 - Pintura Renacentista',
    technique: 'Óleo sobre tabla de álamo',
    period: 'Alto Renacimiento',
    description: 'Retrato renacentista de Lisa Gherardini en Florencia. Destaca por el sfumato (contornos difuminados) y su enigmática introspección psicológica; Da Vinci la llevó a Francia, donde la adquirió Francisco I.',
  },
  {
    id: 2,
    name: 'La noche estrellada',
    artist: 'Vincent van Gogh',
    year: 1889,
    room: 'Sala 3 - Posimpresionismo',
    technique: 'Óleo sobre lienzo',
    period: 'Posimpresionismo',
    description: 'Pintada en el sanatorio psiquiátrico de Saint-Rémy tras su crisis en Arlés. Pionera del posimpresionismo por expresar su estado emocional mediante cielos arremolinados y colores intensos, alejándose del realismo.',
  },
  {
    id: 3,
    name: 'El grito',
    artist: 'Edvard Munch',
    year: 1893,
    room: 'Sala 2 - Expresionismo',
    technique: 'Óleo, temple y pastel sobre cartón',
    period: 'Expresionismo',
    description: 'Inspirada en una súbita crisis de ansiedad del pintor en Oslo. Es el ícono fundacional del expresionismo, plasmando la angustia y la soledad del ser humano moderno.',
  },
  {
    id: 4,
    name: 'Guernica',
    artist: 'Pablo Picasso',
    year: 1937,
    room: 'Sala 8 - Arte Moderno',
    technique: 'Óleo sobre lienzo',
    period: 'Cubismo / Surrealismo',
    description: 'Encargada por la República Española durante la Guerra Civil para denunciar el bombardeo nazi e italiano sobre la villa vasca de Guernica. Su monocromía y figuras desgarradas la convirtieron en el símbolo antibélico universal.',
  },
  {
    id: 5,
    name: 'Las meninas',
    artist: 'Diego Velázquez',
    year: 1656,
    room: 'Sala 12 - Barroco Español',
    technique: 'Óleo sobre lienzo',
    period: 'Barroco',
    description: 'Retrata a la infanta Margarita en el Alcázar de Madrid. Cumbre del Barroco español por incluir al propio pintor y usar un espejo de fondo que refleja a los reyes, jugando con la perspectiva y el espectador.',
  },
  {
    id: 6,
    name: 'La persistencia de la memoria',
    artist: 'Salvador Dalí',
    year: 1931,
    room: 'Sala 9 - Surrealismo',
    technique: 'Óleo sobre lienzo',
    period: 'Surrealismo',
    description: 'Obra clave del surrealismo con sus icónicos «relojes blandos» en la costa de Portlligat. Simboliza la relatividad del tiempo y el subconsciente freudiano frente a la rigidez material.',
  },
  {
    id: 7,
    name: 'El nacimiento de Venus',
    artist: 'Sandro Botticelli',
    year: 1485,
    room: 'Sala 5 - Renacimiento Temprano',
    technique: 'Temple sobre lienzo',
    period: 'Primer Renacimiento',
    description: 'Pintada en la Florencia de los Médici, representa la llegada de la diosa pagana a la costa. Marcó el Renacimiento al recuperar la mitología clásica y el desnudo femenino de gran formato.',
  },
  {
    id: 8,
    name: 'La creación de Adán',
    artist: 'Miguel Ángel',
    year: 1512,
    room: 'Sala 4 - Capilla y Frescos',
    technique: 'Fresco sobre techo',
    period: 'Alto Renacimiento',
    description: 'Fresco del Génesis en la bóveda de la Capilla Sixtina encargado por el papa Julio II. Sus manos a punto de tocarse sintetizan el humanismo renacentista: el hombre dotado de chispa divina e intelecto.',
  },
  {
    id: 9,
    name: 'La joven de la perla',
    artist: 'Johannes Vermeer',
    year: 1665,
    room: 'Sala 11 - Edad de Oro Holandesa',
    technique: 'Óleo sobre lienzo',
    period: 'Barroco Holandés',
    description: 'Obra maestra del Siglo de Oro neerlandés en Delft. No es un retrato formal sino un tronie (estudio de expresión) que resalta por el uso de la luz y el destello del pendiente.',
  },
  {
    id: 10,
    name: 'La ronda de noche',
    artist: 'Rembrandt van Rijn',
    year: 1642,
    room: 'Sala 10 - Gran Galería Holandesa',
    technique: 'Óleo sobre lienzo',
    period: 'Barroco',
    description: 'Encargo de la milicia cívica de Ámsterdam. Rompió con los retratos corporativos estáticos de la época al capturar a los guardias en pleno movimiento usando un dramático claroscuro.',
  },
];

// Variable en memoria para almacenar ítems creados localmente durante la sesión
let localCreatedItems: Item[] = [];

// ============================================================
// QUERY KEYS
// ============================================================
export const ITEMS_QUERY_KEY = ['items'] as const;

// ============================================================
// useItems — Obtener lista de obras de arte desde la API
// ============================================================
export function useItems() {
  return useQuery<Item[]>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async () => {
      // Llamada a la API REST pública
      const { data } = await apiClient.get<ApiPost[]>('/posts?_limit=10');

      // Mapeamos los datos de la API enriqueciendo con los datos del museo
      const apiItems: Item[] = data.map((post, index) => {
        const seed = MUSEUM_SEED_ARTWORKS[index % MUSEUM_SEED_ARTWORKS.length];
        return {
          id: post.id,
          name: seed ? seed.name : `Obra de Arte #${post.id}`,
          artist: seed ? seed.artist : 'Maestro Anónimo',
          year: seed ? seed.year : 1900 + (post.id * 7) % 120,
          room: seed ? seed.room : `Sala ${(post.id % 12) + 1}`,
          technique: seed ? seed.technique : 'Técnica mixta sobre lienzo',
          period: seed ? seed.period : 'Arte Contemporáneo',
          description: seed?.description ?? (post.body ? `${post.body.slice(0, 100)}...` : 'Sin descripción disponible.'),
        };
      });

      // Incluimos las obras agregadas recientemente por el usuario al inicio
      return [...localCreatedItems, ...apiItems];
    },
    staleTime: 1000 * 60 * 2, // 2 minutos de frescura en caché
  });
}

// ============================================================
// useItemById — Obtener una obra de arte por ID
// ============================================================
export function useItemById(id: string | number) {
  const queryClient = useQueryClient();

  return useQuery<Item>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: async () => {
      // 1. Revisar si ya está en los creados localmente
      const localItem = localCreatedItems.find((i) => String(i.id) === String(id));
      if (localItem) return localItem;

      // 2. Revisar si ya está en la caché de la lista general
      const cachedItems = queryClient.getQueryData<Item[]>(ITEMS_QUERY_KEY);
      const inCache = cachedItems?.find((i) => String(i.id) === String(id));
      if (inCache) return inCache;

      // 3. Si no, consultar el endpoint individual de la API
      const { data } = await apiClient.get<ApiPost>(`/posts/${id}`);
      const numId = Number(id);
      const seedIndex = isNaN(numId) ? 0 : (numId - 1) % MUSEUM_SEED_ARTWORKS.length;
      const seed = MUSEUM_SEED_ARTWORKS[seedIndex >= 0 ? seedIndex : 0];

      return {
        id: data.id,
        name: seed ? seed.name : `Obra de Arte #${data.id}`,
        artist: seed ? seed.artist : 'Maestro Anónimo',
        year: seed ? seed.year : 1900 + (data.id * 7) % 120,
        room: seed ? seed.room : `Sala ${(data.id % 12) + 1}`,
        technique: seed ? seed.technique : 'Técnica mixta sobre lienzo',
        period: seed ? seed.period : 'Arte Contemporáneo',
        description: seed?.description ?? data.body ?? 'Sin descripción disponible.',
      };
    },
    enabled: !!id,
  });
}

// ============================================================
// useCreateItem — Registrar una nueva obra de arte mediante POST
// ============================================================
export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, CreateItemPayload>({
    mutationFn: async (payload) => {
      // Enviamos el POST a la API
      const { data } = await apiClient.post<ApiPost>('/posts', {
        title: payload.name,
        body: payload.description,
        userId: 1,
      });

      const newItem: Item = {
        id: data.id ? Number(data.id) + Math.floor(Math.random() * 1000) : Date.now(),
        name: payload.name,
        artist: payload.artist || 'Artista Contemporáneo',
        year: payload.year || new Date().getFullYear(),
        room: payload.room || 'Sala Temporal de Nuevas Adquisiciones',
        technique: payload.technique || 'Óleo sobre lienzo',
        period: payload.period || 'Arte Contemporáneo',
        description: payload.description || 'Obra recientemente adquirida para la colección del museo.',
      };

      // Guardamos en memoria para reflejarlo en la lista y detalle
      localCreatedItems = [newItem, ...localCreatedItems];
      return newItem;
    },
    onSuccess: (newItem) => {
      // Actualizamos inmediatamente el caché para feedback instantáneo
      queryClient.setQueryData<Item[]>(ITEMS_QUERY_KEY, (oldData) => {
        return oldData ? [newItem, ...oldData] : [newItem];
      });

      // Invalidamos para sincronizar con el servidor
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Error al registrar la obra de arte en la API:', error.message);
    },
  });
}

// ============================================================
// useDeleteItem — Eliminar una obra de arte mediante DELETE
// ============================================================
export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/posts/${id}`);
      localCreatedItems = localCreatedItems.filter((item) => String(item.id) !== String(id));
    },
    onSuccess: (_data, deletedId) => {
      queryClient.setQueryData<Item[]>(ITEMS_QUERY_KEY, (oldData) => {
        return oldData ? oldData.filter((item) => String(item.id) !== String(deletedId)) : [];
      });
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}
