import { ICommand, ECommand } from '../types/index.js';
import { TOffer } from '../../shared/types/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

export class ImportCommand implements ICommand {
  public getName(): string {
    return ECommand.Import;
  }

  private onImportedOffer(offer: TOffer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename?.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);

      if (error instanceof Error) {
        console.error(`Details: ${error.message}`);
      }
    }
  }
}

