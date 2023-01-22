"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
function getProducts() {
    return [
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
            name: 'Euphorbia Cactus',
            price: 125,
            pictures: 'cact1_0.webp, cact1_1.webp, cact1_2.webp',
            category: 'cactus',
            description: 'The Euphorbia Cactus is known for its candlestick-like structure. Incredibly easy to grow, this plant is perfect for both the novice and the botanist. But especially for those who want a western touch at home, without too much effort.',
        },
        {
            id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
            name: 'Myrtillocactus geometrizans',
            price: 23,
            pictures: 'cact2_0.jpeg, cact2_1.jpeg, cact2_2.jpeg',
            category: 'cactus',
            description: "Astrophytum myriostigma, the bishops cap cactus, bishop's hat or bishop's miter cactus, is a species of cactus native to the highlands of northeastern and central Mexico.",
        },
        {
            id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3779e56',
            name: 'Coryphantha bumamma',
            price: 27,
            pictures: 'cact3_0.jpeg, cact3_1.jpeg, cact3_2.jpeg',
            category: 'cactus',
            description: 'Coryphantha bumamma is a strongly offsetting species forming large groups up to 50 cm in diameter. In adulthood it produces an abundant amount of attractive wool that covers its body. This will wash off if watered from above but will re-grow again. It is very similar to C. elephantidens but the flower are much smaller and nearly yellow.',
        },
        {
            id: 'c910c7b9-a67d-9edb-8ce7-e3c9f3669e57',
            name: 'Myrtillocactus geometrizans',
            price: 55,
            pictures: 'cact4_0.jpeg, cact4_1.jpeg, cact4_2.jpeg, cact4_3.jpeg',
            category: 'cactus',
            description: 'Myrtillocactus geometrizans is a large shrubby cactus growing to 4–5 m tall',
        },
    ];
}
function getOrders() {
    return [
        {
            id: 'gd105551-0f0x-6b9f-bc41-c529c8a17372',
            name: 'John',
            surname: 'Doe',
            address: 'Emerald St.',
            items: [
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
    await Promise.all(getProducts().map((product) => {
        return db.product.create({ data: product });
    }));
    await Promise.all(getOrders().map((_a) => {
        var { items } = _a, orderData = __rest(_a, ["items"]);
        return db.order.create({
            data: Object.assign(Object.assign({}, orderData), { products: {
                    create: items.map((product) => {
                        return {
                            product: { connect: { id: product.id } },
                            quantity: product.quantity,
                        };
                    }),
                } }),
        });
    }));
}
seed();
//# sourceMappingURL=seed.js.map