import { readFileSync } from 'node:fs';

import { IFileReader } from './types/index.js';
import {
  TOffer,
  EHousing,
  EFacilities,
  EUserType,
  TCoords,
} from '../../types/index.js';
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
      price,
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
      housingType: housingType as EHousing,
      roomsNumber: Number.parseInt(roomsNumber, RADIX),
      visitorsNumber: Number.parseInt(visitorsNumber, RADIX),
      price: Number.parseInt(price, RADIX),
      facilities: this.parseSemiclonSeparatedValues<EFacilities[]>(facilities),
      commentsCount: Number.parseInt(commentsCount, RADIX),
      coords: this.parseCoords(coords),
      author: {
        name: userName,
        email,
        avatarPath,
        password,
        type: userType as EUserType,
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
