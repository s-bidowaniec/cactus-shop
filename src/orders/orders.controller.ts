import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Get('/')
  getAll() {
    return this.ordersService.getAll();
  }
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersService.getById(id);
  }
  @Post('/')
  addNew(
    @Body()
    formData: CreateOrderDTO,
  ) {
    return this.ordersService.addNew(formData);
  }
}
