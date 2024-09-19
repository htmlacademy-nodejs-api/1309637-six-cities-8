import chalk from 'chalk';

import { ICommand, ECommand } from '../types/index.js';

export class HelpCommand implements ICommand {
  public getName(): string {
    return ECommand.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.  

      Пример: cli.js --<${chalk.blue('command')}> [${chalk.green('--arguments')}]

      Команды:

      ${chalk.green(ECommand.Version)}:                   ${chalk.magenta('# выводит номер версии package.json')}
      ${chalk.green(ECommand.Help)}:                      ${chalk.magenta('# выводит список доступных команд')}
      ${chalk.green(ECommand.Import)} <path>:             ${chalk.magenta('# импортирует данные из TSV')}
      ${chalk.green(ECommand.Generate)} <n> <path> <url>: ${chalk.magenta('# генерирует произвольное количество тестовых объвлений')}
                                    ${chalk.magenta(' - n - количество объявлений для генерации')}
                                    ${chalk.magenta(' - path - путь к файлу для записи результата')}
                                    ${chalk.magenta(' - url - URL сервиса')}
    `);
  }
}
