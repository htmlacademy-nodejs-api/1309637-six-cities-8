import { EFacilities, EHousing, EUserType, ECity } from './index.js';

export type TMockServerData = {
  titles: string[];
  descriptions: string[];
  cities: ECity[];
  images: string[];
  housingTypes: EHousing[];
  facilities: EFacilities[];
  coords: string[];
  users: string[];
  emails: string[];
  avatars: string[];
  userTypes: EUserType[];
}
