import { ICommand } from '../types/command.interface.js';
import { CommandEnum } from '../types/command.enum.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

export class ImportCommand implements ICommand {
  public getName(): string {
    return CommandEnum.Import;
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

