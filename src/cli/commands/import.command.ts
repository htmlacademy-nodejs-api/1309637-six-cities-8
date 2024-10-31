import { ICommand, ECommand } from '../types/index.js';
import { IOffer } from '../../shared/types/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { IUserService } from '../../shared/modules/user/types/index.js';
import { IOfferService } from '../../shared/modules/offer/types/index.js';
import { IDatabaseClient } from '../../shared/libs/database-client/types/index.js';
import { ILogger } from '../../shared/libs/logger/types/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/index.js';
import { DefaultOfferService } from '../../shared/modules/offer/index.js';
import { DefaultUserService } from '../../shared/modules/user/index.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { getMongoURI } from '../../shared/helpers/database.js';
import { UserModel } from '../../shared/modules/index.js';
import { OfferModel } from '../../shared/modules/index.js';

const DEFAULT_DB_PORT = '27017';
const DEFAULT_USER_PASSWORD = '123456';

export class ImportCommand implements ICommand {
  private userService: IUserService;
  private offerService: IOfferService;
  private databaseClient: IDatabaseClient;
  private logger: ILogger;
  private salt: string = '';

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return ECommand.Import;
  }

  private async onImportedOffer(offer: IOffer, resolve: () => void): Promise<void> {
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async saveOffer(offer: IOffer): Promise<void> {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD,
    }, this.salt);

    await this.offerService.create({
      authorId: user.id,
      title: offer.title,
      description: offer.description,
      city: offer.city,
      previewImagePath: offer.previewImagePath,
      photos: offer.photos,
      isPremium: offer.isPremium,
      housingType: offer.housingType,
      roomsNumber: offer.roomsNumber,
      visitorsNumber: offer.visitorsNumber,
      price: offer.price,
      facilities: offer.facilities,
      coords: offer.coords,
    });
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT as string, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

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

