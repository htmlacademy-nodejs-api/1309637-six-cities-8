import { EFacilities, TCoords, EHousing, TUser } from './index.js';

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
  cost: number;
  facilities: EFacilities[];
  author: TUser;
  commentsCount: number;
  coords: TCoords;
}
