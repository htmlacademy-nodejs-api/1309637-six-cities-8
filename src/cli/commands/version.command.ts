import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { ICommand } from '../types/index.js';
import { ECommand } from '../types/index.js';

export class VersionCommand implements ICommand {
  constructor(
    private readonly filePath: string = 'package.json'
  ) {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), {
      encoding: 'utf-8'
    });

    const importedContent = JSON.parse(jsonContent);

    this.isPackageJSONConfig(importedContent);

    return importedContent.version;
  }

  private isPackageJSONConfig(value: unknown): asserts value is { version: string } {
    if (!(
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.hasOwn(value, 'version')
    )) {
      throw new Error('Failed to parse json content');
    }
  }

  public getName(): string {
    return ECommand.Version;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
