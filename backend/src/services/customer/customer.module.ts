import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { VhcMasterModule } from 'src/modules/vhc-master/vhc-master.module';
import { VhcMasterEntity } from 'src/modules/vhc-master/entities/vhc-master.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VhcMasterService } from 'src/modules/vhc-master/vhc-master.service';

@Module({
  imports: [VhcMasterModule, TypeOrmModule.forFeature([VhcMasterEntity])],
  controllers: [CustomerController],
  providers: [CustomerService, VhcMasterService],
})
export class CustomerModule {}
