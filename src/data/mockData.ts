import { Item } from '../types';

export const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    name: 'La Gioconda',
    subtitle: 'Leonardo da Vinci · 1503',
    imageUri: require('../../0-assets/MONA.jpg'),
    artist: 'Leonardo da Vinci',
    year: 1503,
    room: 'Sala Renacimiento',
  },
  {
    id: '2',
    name: 'La noche estrellada',
    subtitle: 'Vincent van Gogh · 1889',
    imageUri: require('../../0-assets/LANOCHE.webp'),
    artist: 'Vincent van Gogh',
    year: 1889,
    room: 'Sala Postimpresionismo',
  },
  {
    id: '3',
    name: 'El grito',
    subtitle: 'Edvard Munch · 1893',
    imageUri: require('../../0-assets/elgriton.jpg'),
    artist: 'Edvard Munch',
    year: 1893,
    room: 'Sala Expresionismo',
  },
  {
    id: '4',
    name: 'Las meninas',
    subtitle: 'Diego Velázquez · 1656',
    imageUri: require('../../0-assets/LASMENINAS.jpg'),
    artist: 'Diego Velázquez',
    year: 1656,
    room: 'Sala Barroco',
  },
];