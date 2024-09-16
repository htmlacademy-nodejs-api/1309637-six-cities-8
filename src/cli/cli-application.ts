import { ICommand } from './types/command.interface.js';
import { CommandParser } from './index.js';
import { ECommand } from './types/index.js';

export class CLIApplication {
  private readonly commands: Record<string, ICommand> = {};

  constructor(
    private readonly defaultCommand: string = ECommand.Help
  ) {}

  public registerCommands(commandList: ICommand[]): void {
    commandList.forEach((command) => {
      if (this.commands[command.getName()]) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): ICommand {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): ICommand {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered`);
    }

    return this.commands[this.defaultCommand];
  }

  public async processCommand(argv: string[]): Promise<void> {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandsArguments = parsedCommand[commandName] ?? [];
    await command.execute(...commandsArguments);
  }
}
