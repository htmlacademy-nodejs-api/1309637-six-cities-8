import dayjs from 'dayjs';

import { IOfferGenerator } from './types/index.js';
import { EFacilities, EHousing, EUserType, TMockServerData } from '../../types/index.js';
import {
  MIN_PRICE,
  MAX_PRICE,
  MIN_ROOMS,
  MAX_ROOMS,
  MIN_VISITORS,
  MAX_VISITORS,
  MIN_RATING,
  MAX_RATING,
  MAX_RATING_NUM_AFTER_DIGIT,
  FIRST_WEEK_DAY,
  LAST_WEEK_DAY,
  MOCK_MIN_COMMENTS,
  MOCK_MAX_COMMENTS,
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
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, MAX_RATING_NUM_AFTER_DIGIT);
    const housingType = getRandomItem<EHousing>(this.mockData.housingTypes);
    const roomsNumber = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const visitorsNumber = generateRandomValue(MIN_VISITORS, MAX_VISITORS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const facilities = getRandomItems<EFacilities>(this.mockData.facilities).join(';');
    const commentsCount = generateRandomValue(MOCK_MIN_COMMENTS, MOCK_MAX_COMMENTS);
    const coords = getRandomItem<string>(this.mockData.coords);
    const userName = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomItem<EUserType>(this.mockData.userTypes);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
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
