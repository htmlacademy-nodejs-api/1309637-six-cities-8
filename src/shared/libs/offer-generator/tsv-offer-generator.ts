import dayjs from 'dayjs';

import { IOfferGenerator } from './types/index.js';
import { EFacilities, EHousing, EUserType, TMockServerData } from '../../types/index.js';
import {
  PRICE,
  RATING,
  ROOMS_NUMBER,
  WEEK_DAY,
  VISITORS_NUMBER,
  MOCK_COMMENTS_NUMBER,
} from '../../constants/index.js';
import {
  generateRandomValue,
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
    const isPremium = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(RATING.MIN, RATING.MAX, RATING.MAX_NUM_AFTER_DIGIT);
    const housingType = getRandomItem<EHousing>(this.mockData.housingTypes);
    const roomsNumber = generateRandomValue(ROOMS_NUMBER.MIN, ROOMS_NUMBER.MAX);
    const visitorsNumber = generateRandomValue(VISITORS_NUMBER.MIN, VISITORS_NUMBER.MAX);
    const price = generateRandomValue(PRICE.MIN, PRICE.MAX);
    const facilities = getRandomItems<EFacilities>(this.mockData.facilities).join(';');
    const commentsCount = generateRandomValue(MOCK_COMMENTS_NUMBER.MIN, MOCK_COMMENTS_NUMBER.MAX);
    const coords = getRandomItem<string>(this.mockData.coords);
    const userName = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomItem<EUserType>(this.mockData.userTypes);

    const createdDate = dayjs()
      .subtract(generateRandomValue(WEEK_DAY.FIRST, WEEK_DAY.LAST), 'day')
      .toISOString();

    return [
      title,
      description,
      createdDate,
      city,
      previewImagePath,
      photos,
      isPremium,
      rating,
      housingType,
      roomsNumber,
      visitorsNumber,
      price,
      facilities,
      commentsCount,
      coords,
      userName,
      email,
      avatarPath,
      password,
      userType,
    ].join('\t');
  }
}
