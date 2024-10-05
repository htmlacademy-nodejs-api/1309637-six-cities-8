import chalk from 'chalk';

import { ICommand, ECommand } from '../types/index.js';

export class HelpCommand implements ICommand {
  public getName(): string {
    return ECommand.Help;
  }

  public execute(..._parameters: string[]): void {
    console.info(`
      Программа для подготовки данных для REST API сервера.  

      Пример: cli.js --<${chalk.blue('command')}> [${chalk.green('--arguments')}]

      Команды:

      ${chalk.green(ECommand.Version)}:                   ${chalk.magenta('# выводит номер версии package.json')}
      ${chalk.green(ECommand.Help)}:                      ${chalk.magenta('# выводит список доступных команд')}
      ${chalk.green(ECommand.Import)} <path> <login> <password> <host> <dbname> <salt>:
                                  ${chalk.magenta(' # импортирует данные из TSV в БД')}
                                    ${chalk.magenta(' - path - путь к импортируемому файлу')}
                                    ${chalk.magenta(' - login - логин БД')}
                                    ${chalk.magenta(' - password - пароль БД')}
                                    ${chalk.magenta(' - host - хост БД')}
                                    ${chalk.magenta(' - dbname - имя БД')}
                                    ${chalk.magenta(' - salt - соль')}
      ${chalk.green(ECommand.Generate)} <n> <path> <url>: ${chalk.magenta('# генерирует произвольное количество тестовых объвлений')}
                                    ${chalk.magenta(' - n - количество объявлений для генерации')}
                                    ${chalk.magenta(' - path - путь к файлу для записи результата')}
                                    ${chalk.magenta(' - url - URL сервиса')}
    `);
  }
}
