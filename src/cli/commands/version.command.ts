import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { isPackageJSONConfig } from '../../helpers/isPackageJSONConfig.js';
import { Command } from './command.interface.js';
import { CommandName } from '../types/command-name.enum.js';

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = 'package.json'
  ) {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), {
      encoding: 'utf-8'
    });

    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content');
    }

    return importedContent.version;
  }

  public getName(): string {
    return CommandName.Version;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
