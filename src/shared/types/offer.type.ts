import { EFacilities, TCoords, EHousing, IUser } from './index.js';

export type TOffer = {
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
  commentsCount: number;
  coords: TCoords;
}
