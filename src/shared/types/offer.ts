import { ConvenienceType } from './convenience-type.js';
import { Coords } from './coords.js';
import { HousingType } from './housing-type.js';
import { User } from './user.js';

export type Offer = {
  title: string;
  description: string;
  createdDate: Date;
  city: string;
  previewImagePath: string;
  photos: string[];
  isPremium: boolean;
  isFavourites: boolean;
  rating: number;
  housingType: HousingType;
  roomsNumber: number;
  visitorsNumber: number;
  cost: number;
  convenience: ConvenienceType[];
  author: User;
  commentsCount: number;
  coords: Coords;
}
