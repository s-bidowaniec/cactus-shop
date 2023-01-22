import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAll(): Promise<import(".prisma/client").Order[]>;
    getById(id: string): Promise<void | import(".prisma/client").Order>;
    addNew(formData: CreateOrderDTO): Promise<void | object>;
}
