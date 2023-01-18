import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../shared/services/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  // GET
  async getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }
  async getById(id: Product['id']): Promise<Product | void> {
    const currentPlant = this.prismaService.product.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            order: true,
          },
        },
      },
    });
    if (!currentPlant) {
      throw new NotFoundException('Plant not found');
    } else {
      return currentPlant;
    }
  }
}
