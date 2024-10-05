import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { IFileReader } from './types/index.js';
import {
  IOffer,
  EHousing,
  EFacilities,
  EUserType,
  TCoords,
} from '../../types/index.js';
import { RADIX, CHUNK_SIZE } from '../../constants/index.js';

export class TSVFileReader extends EventEmitter implements IFileReader {
  constructor(
    private readonly filename: string
  ) {
    super();
  }

  private parseLineToOffer(line: string): IOffer {
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
      coords,
      userName,
      email,
      avatarPath,
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
      coords: this.parseCoords(coords),
      author: {
        name: userName,
        email,
        avatarPath,
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    const state = {
      remainingData: '',
      nextLinePosition: -1,
      importedRowCount: 1,
    };

    for await (const chunk of readStream) {
      state.remainingData += chunk.toString();

      while ((state.nextLinePosition = state.remainingData.indexOf('\n')) >= 0) {
        const completeRow = state.remainingData.slice(0, state.nextLinePosition++);
        state.remainingData = state.remainingData.slice(state.nextLinePosition++);
        state.importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);

        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', state.importedRowCount);
  }
}
