import got from 'got';

import { RADIX } from '../../shared/constants/index.js';
import { TMockServerData } from '../../shared/types/index.js';
import { ECommand, ICommand } from '../types/index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';

export class GenerateCommand implements ICommand {
  private initialData?: TMockServerData;

  private async load(url: string): Promise<void> {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number): Promise<void> {
    if (!this.initialData) {
      throw new Error('Data isn\'t loaded');
    }

    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return ECommand.Generate;
  }

  public async execute(...parameters: string[]): Promise<void> {
    try {
      const [count, filepath, url] = parameters;

      const offerCount = Number.parseInt(count, RADIX);

      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error) {
      console.error('Can\'t generate data');
    }
  }
}
