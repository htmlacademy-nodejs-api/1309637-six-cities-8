import dayjs from 'dayjs';

import { IOfferGenerator } from './types/index.js';
import { EFacilities, EHousing, EUserType, TMockServerData } from '../../types/index.js';
import {
  Price,
  Rating,
  RoomsNumber,
  WeekDay,
  VisitorsNumber,
  MockCommentsNumber,
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
    const rating = generateRandomValue(Rating.MIN, Rating.MAX, Rating.MAX_NUM_AFTER_DIGIT);
    const housingType = getRandomItem<EHousing>(this.mockData.housingTypes);
    const roomsNumber = generateRandomValue(RoomsNumber.MIN, RoomsNumber.MAX);
    const visitorsNumber = generateRandomValue(VisitorsNumber.MIN, VisitorsNumber.MAX);
    const price = generateRandomValue(Price.MIN, Price.MAX);
    const facilities = getRandomItems<EFacilities>(this.mockData.facilities).join(';');
    const commentsCount = generateRandomValue(MockCommentsNumber.MIN, MockCommentsNumber.MAX);
    const coords = getRandomItem<string>(this.mockData.coords);
    const userName = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomItem<EUserType>(this.mockData.userTypes);

    const createdDate = dayjs()
      .subtract(generateRandomValue(WeekDay.FIRST, WeekDay.LAST), 'day')
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
