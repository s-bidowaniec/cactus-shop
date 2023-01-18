import { Product } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreateOrderDTO {
  id: Product['id'];
  quantity: string;
}
