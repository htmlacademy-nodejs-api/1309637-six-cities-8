import chalk from 'chalk';

import { Command } from './command.interface.js';
import { CommandName } from '../types/command-name.enum.js';

export class HelpCommand implements Command {
  public getName(): string {
    return CommandName.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.  

      Пример: cli.js --<${chalk.blue('command')}> [${chalk.green('--arguments')}]

      Команды:

      ${chalk.green(CommandName.Version)}:                   ${chalk.magenta('# выводит номер версии')}
      ${chalk.green(CommandName.Help)}:                      ${chalk.magenta('# печатает этот текст')}
      ${chalk.green(CommandName.Import)} <path>:             ${chalk.magenta('# импортирует данные из TSV')}
      ${chalk.green(CommandName.Generate)} <n> <path> <url>  ${chalk.magenta('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
