import { Product } from '@prisma/client';
export declare class Item {
    id: Product['id'];
    quantity: string;
}
export declare class CreateOrderDTO {
    name: string;
    surname: string;
    address: string;
    items: Item[];
}
