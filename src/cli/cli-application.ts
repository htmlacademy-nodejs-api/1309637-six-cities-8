import { CommandParser } from './index.js';
import { ECommand, ICommand } from './types/index.js';

export class CLIApplication {
  private readonly commands: Record<string, ICommand> = {};

  constructor(
    private readonly defaultCommand: string = ECommand.Help
  ) {}

  public registerCommands(commandList: ICommand[]): void {
    for (const command of commandList) {
      if (this.commands[command.getName()]) {
        console.error(`Command ${command.getName()} is already registered`);
        continue;
      }

      this.commands[command.getName()] = command;
    }
  }

  public getCommand(commandName: string): ICommand {
    return this.commands[commandName] || this.getDefaultCommand();
  }

  public getDefaultCommand(): ICommand {
    try {
      return this.commands[this.defaultCommand];
    } catch (error) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered`);
    }
  }

  public async processCommand(argv: string[]): Promise<void> {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandsArguments = parsedCommand[commandName] || [];
    await command.execute(...commandsArguments);
  }
}
