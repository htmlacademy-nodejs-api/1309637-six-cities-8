import { EFacilities, TCoords, EHousing, IUser, ECity } from './index.js';

export interface IOffer {
  title: string;
  description: string;
  city: ECity;
  previewImagePath: string;
  photos: string[];
  isPremium: boolean;
  housingType: EHousing;
  roomsNumber: number;
  visitorsNumber: number;
  price: number;
  facilities: EFacilities[];
  author: IUser;
  coords: TCoords;
}
