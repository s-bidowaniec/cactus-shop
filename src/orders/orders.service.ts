import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO, Item } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  // GET
  async getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }
  async getById(id: Order['id']): Promise<Order | void> {
    const currentOrder = this.prismaService.order.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!currentOrder) {
      throw new NotFoundException('Order not found');
    } else {
      return currentOrder;
    }
  }
  // POST
  async addNew(formData: CreateOrderDTO): Promise<object | void> {
    try {
      await this.prismaService.order.create({
        data: {
          name: formData.name,
          surname: formData.surname,
          address: formData.address,
          products: {
            create: formData.items.map((product: Item) => {
              return {
                product: { connect: { id: product.id } },
                quantity: Number.parseInt(product.quantity),
              };
            }),
          },
        },
      });
      return { success: true };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Order allready exist');
      } else {
        throw error;
      }
    }
  }
  // PUT
}
