import { ICommand } from '../types/index.js';
import { ECommand } from '../types/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

export class ImportCommand implements ICommand {
  public getName(): string {
    return ECommand.Import;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename?.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);

      if (error instanceof Error) {
        console.error(`Details: ${error.message}`);
      }
    }
  }
}

