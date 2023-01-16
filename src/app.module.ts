import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsController } from './plants/plants.controller';
import { PlantsService } from './plants/plants.service';
import { PlantsModule } from './plants/plants.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [PlantsModule, OrdersModule],
  controllers: [AppController, PlantsController],
  providers: [AppService, PlantsService],
})
export class AppModule {}
