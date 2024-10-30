import { IsNumber } from 'class-validator';

export class CoordsDTO {
  @IsNumber()
  public latitude!: number;

  @IsNumber()
  public longitude!: number;
}
