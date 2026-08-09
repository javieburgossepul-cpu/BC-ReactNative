import { ImageSourcePropType } from 'react-native';

export interface Item {
  id: string;
  name: string;
  imageUri: ImageSourcePropType;
  subtitle: string;
  artist: string;
  year: number;
  room: string;
}