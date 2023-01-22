import { Product } from '@prisma/client';
import { PrismaService } from '../shared/services/prisma/prisma.service';
export declare class ProductsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<Product[]>;
    getById(id: Product['id']): Promise<Product | void>;
}
