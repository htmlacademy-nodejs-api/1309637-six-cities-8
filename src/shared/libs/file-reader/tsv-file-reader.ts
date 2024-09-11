import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.js';
import { HousingType } from '../../types/housing-type.js';
import { ConvenienceType } from '../../types/convenience-type.js';
import { UserType } from '../../types/user-type.js';
import { Coords } from '../../types/coords.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
      city,
      previewImagePath,
      photos,
      isPremium,
      isFavourites,
      rating,
      housingType,
      roomsNumber,
      visitorsNumber,
      cost,
      convenience,
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
      photos: this.parsePhotos(photos),
      isPremium: this.parseBoolean(isPremium),
      isFavourites: this.parseBoolean(isFavourites),
      rating: Number.parseInt(rating, 10),
      housingType: housingType as HousingType,
      roomsNumber: Number.parseInt(roomsNumber, 10),
      visitorsNumber: Number.parseInt(visitorsNumber, 10),
      cost: Number.parseInt(cost, 10),
      convenience: this.parseConvenience(convenience),
      commentsCount: Number.parseInt(commentsCount, 10),
      coords: this.parseCoords(coords),
      author: {
        name: userName,
        email,
        avatarPath,
        password,
        type: userType as UserType,
      },
    };
  }

  private parsePhotos(photos: string): string[] {
    return photos.split(';');
  }

  private parseConvenience(convenience: string): ConvenienceType[] {
    return convenience.split(';') as ConvenienceType[];
  }

  private parseCoords(coords: string): Coords {
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

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
