import { PrismaService } from '../shared/services/prisma/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
export declare class OrdersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<Order[]>;
    getById(id: Order['id']): Promise<Order | void>;
    addNew(formData: CreateOrderDTO): Promise<object | void>;
}
