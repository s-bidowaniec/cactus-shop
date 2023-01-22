import { PrismaClient } from '@prisma/client';
import { connect } from 'rxjs';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Ferocactus wislizeni',
      price: 25,
      pictures: 'cact1_0.webp, cact1_1.webp, cact1_2.webp',
      category: 'cactus',
      description: 'The fishhook barrel cactus',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Myrtillocactus geometrizans',
      price: 23,
      pictures: 'cact2_0.jpeg, cact2_1.jpeg, cact2_2.jpeg',
      category: 'cactus',
      description:
        'Myrtillocactus geometrizans is a large shrubby cactus growing to 4–5 m tall',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'gd105551-0f0x-6b9f-bc41-c529c8a17372',
      products: [
        {
          id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
          quantity: 3,
        },
        {
          id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
          quantity: 6,
        },
      ],
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );
  await Promise.all(
    getOrders().map(({ products, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          products: {
            create: products.map((product) => {
              return {
                product: { connect: { id: product.id } },
                quantity: product.quantity,
              };
            }),
          },
        },
      });
    }),
  );
}

seed();
