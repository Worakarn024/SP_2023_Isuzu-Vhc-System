import { Module } from '@nestjs/common';
import { VhcMasterService } from './vhc-master.service';
import { VhcMasterController } from './vhc-master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VhcMasterEntity } from './entities/vhc-master.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VhcMasterEntity])],
  controllers: [VhcMasterController],
  providers: [VhcMasterService, TypeOrmModule],
})
export class VhcMasterModule {}
