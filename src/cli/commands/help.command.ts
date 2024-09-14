import chalk from 'chalk';

import { ICommand } from '../types/command.interface.js';
import { CommandEnum } from '../types/command.enum.js';

export class HelpCommand implements ICommand {
  public getName(): string {
    return CommandEnum.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.  

      Пример: cli.js --<${chalk.blue('command')}> [${chalk.green('--arguments')}]

      Команды:

      ${chalk.green(CommandEnum.Version)}:                   ${chalk.magenta('# выводит номер версии package.json')}
      ${chalk.green(CommandEnum.Help)}:                      ${chalk.magenta('# выводит список доступных команд')}
      ${chalk.green(CommandEnum.Import)} <path>:             ${chalk.magenta('# импортирует данные из TSV')}
      ${chalk.green(CommandEnum.Generate)} <n> <path> <url>  ${chalk.magenta('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
