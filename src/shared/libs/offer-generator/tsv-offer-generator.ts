import { IOfferGenerator } from './types/index.js';
import { EFacilities, EHousing, EUserType, TMockServerData } from '../../types/index.js';
import {
  PRICE,
  ROOMS_NUMBER,
  VISITORS_NUMBER,
} from '../../constants/index.js';
import {
  getRandomNumber,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: TMockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImagePath = getRandomItem<string>(this.mockData.images);
    const photos = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = Boolean(getRandomNumber(0, 1));
    const housingType = getRandomItem<EHousing>(this.mockData.housingTypes);
    const roomsNumber = getRandomNumber(ROOMS_NUMBER.MIN, ROOMS_NUMBER.MAX);
    const visitorsNumber = getRandomNumber(VISITORS_NUMBER.MIN, VISITORS_NUMBER.MAX);
    const price = getRandomNumber(PRICE.MIN, PRICE.MAX);
    const facilities = getRandomItems<EFacilities>(this.mockData.facilities).join(';');
    const coords = getRandomItem<string>(this.mockData.coords);
    const userName = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const userType = getRandomItem<EUserType>(this.mockData.userTypes);

    return [
      title,
      description,
      city,
      previewImagePath,
      photos,
      isPremium,
      housingType,
      roomsNumber,
      visitorsNumber,
      price,
      facilities,
      coords,
      userName,
      email,
      avatarPath,
      userType,
    ].join('\t');
  }
}
