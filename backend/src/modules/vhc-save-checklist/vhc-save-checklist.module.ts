import { Module } from '@nestjs/common';
import { VhcSaveChecklistService } from './vhc-save-checklist.service';
import { VhcSaveChecklistController } from './vhc-save-checklist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VhcSaveChecklistEntity } from './entities/vhc-save-checklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VhcSaveChecklistEntity])],
  controllers: [VhcSaveChecklistController],
  providers: [VhcSaveChecklistService],
})
export class VhcSaveChecklistModule {}
