import { Product } from '@prisma/client';
import {
  IsNotEmpty,
  Length,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class Item {
  id: Product['id'];
  quantity: string;
}
export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  surname: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  address: string;
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  items: Item[];
}
