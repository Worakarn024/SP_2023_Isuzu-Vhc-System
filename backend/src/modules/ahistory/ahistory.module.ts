import { Module } from '@nestjs/common';
import { AhistoryService } from './ahistory.service';
import { AhistoryController } from './ahistory.controller';
import { AhistoryEntity } from './entities/ahistory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AhistoryEntity])],
  controllers: [AhistoryController],
  providers: [AhistoryService],
})
export class AhistoryModule {}
