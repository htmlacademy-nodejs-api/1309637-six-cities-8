import { EFacilities, EHousing, EUserType } from './index.js';

export type TMockServerData = {
  titles: string[];
  descriptions: string[];
  cities: string[];
  images: string[];
  housingTypes: EHousing[];
  facilities: EFacilities[];
  coords: string[];
  users: string[];
  emails: string[];
  avatars: string[];
  userTypes: EUserType[];
}
