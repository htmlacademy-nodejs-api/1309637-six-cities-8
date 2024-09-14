import { FacilitiesEnum } from './facilities.enum.js';
import { TCoords } from './coords.type.js';
import { HousingEnum } from './housing.enum.js';
import { TUser } from './user.type.js';

export type TOffer = {
  title: string;
  description: string;
  createdDate: Date;
  city: string;
  previewImagePath: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  housingType: HousingEnum;
  roomsNumber: number;
  visitorsNumber: number;
  cost: number;
  facilities: FacilitiesEnum[];
  author: TUser;
  commentsCount: number;
  coords: TCoords;
}
