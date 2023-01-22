"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../shared/services/prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll() {
        return this.prismaService.order.findMany();
    }
    async getById(id) {
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
            throw new common_1.NotFoundException('Order not found');
        }
        else {
            return currentOrder;
        }
    }
    async addNew(formData) {
        try {
            await this.prismaService.order.create({
                data: {
                    name: formData.name,
                    surname: formData.surname,
                    address: formData.address,
                    products: {
                        create: formData.items.map((product) => {
                            return {
                                product: { connect: { id: product.id } },
                                quantity: Number.parseInt(product.quantity),
                            };
                        }),
                    },
                },
            });
            return { success: true };
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Order allready exist');
            }
            else {
                throw error;
            }
        }
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map