import { readFileSync } from 'node:fs';

import { IFileReader } from './types/file-reader.interface.js';
import { TOffer } from '../../types/offer.type.js';
import { HousingEnum } from '../../types/housing.enum.js';
import { FacilitiesEnum } from '../../types/facilities.enum.js';
import { UserTypeEnum } from '../../types/user-type.enum.js';
import { TCoords } from '../../types/coords.type.js';
import { RADIX } from '../../constants/index.js';

export class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): TOffer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): TOffer {
    const [
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
      cost,
      facilities,
      commentsCount,
      coords,
      userName,
      email,
      avatarPath,
      password,
      userType,
    ] = line.split('\t');

    return {
      title,
      description,
      createdDate: new Date(createdDate),
      city,
      previewImagePath,
      photos: this.parseSemiclonSeparatedValues<string[]>(photos),
      isPremium: this.parseBoolean(isPremium),
      rating: Number.parseInt(rating, RADIX),
      housingType: housingType as HousingEnum,
      roomsNumber: Number.parseInt(roomsNumber, RADIX),
      visitorsNumber: Number.parseInt(visitorsNumber, RADIX),
      cost: Number.parseInt(cost, RADIX),
      facilities: this.parseSemiclonSeparatedValues<FacilitiesEnum[]>(facilities),
      commentsCount: Number.parseInt(commentsCount, RADIX),
      coords: this.parseCoords(coords),
      author: {
        name: userName,
        email,
        avatarPath,
        password,
        type: userType as UserTypeEnum,
      },
    };
  }

  private parseSemiclonSeparatedValues<T>(values: string): T {
    return values.split(';') as T;
  }

  private parseCoords(coords: string): TCoords {
    const [latitude, longitude] = coords.split(',');

    return {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    };
  }

  private parseBoolean(value: string): boolean {
    return value === 'true';
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): TOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
