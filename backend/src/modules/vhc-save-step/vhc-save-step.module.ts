import { Module } from '@nestjs/common';
import { VhcSaveStepService } from './vhc-save-step.service';
import { VhcSaveStepController } from './vhc-save-step.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VhcSaveStepEntity } from './entities/vhc-save-step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VhcSaveStepEntity])],
  controllers: [VhcSaveStepController],
  providers: [VhcSaveStepService],
})
export class VhcSaveStepModule {}
