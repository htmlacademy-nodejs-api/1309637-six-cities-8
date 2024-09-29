import { EFacilities, TCoords, EHousing, IUser } from './index.js';

export interface IOffer {
  title: string;
  description: string;
  createdDate: Date;
  city: string;
  previewImagePath: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  housingType: EHousing;
  roomsNumber: number;
  visitorsNumber: number;
  price: number;
  facilities: EFacilities[];
  author: IUser;
  coords: TCoords;
}
