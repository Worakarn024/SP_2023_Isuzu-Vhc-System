import { Module } from '@nestjs/common';
import { GeneratePdfService } from './generate-pdf.service';
import { GeneratePdfController } from './generate-pdf.controller';
import { EmployeeService } from 'src/services/employee/employee.service';
import { VhcModule } from 'src/services/vhc/vhc.module';
import { VhcService } from 'src/services/vhc/vhc.service';
import { VhcMasterService } from 'src/modules/vhc-master/vhc-master.service';
import { VhcMasterModule } from 'src/modules/vhc-master/vhc-master.module';
import { VhcMasterEntity } from 'src/modules/vhc-master/entities/vhc-master.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VhcSaveChecklistModule } from 'src/modules/vhc-save-checklist/vhc-save-checklist.module';
import { VhcSaveStepModule } from 'src/modules/vhc-save-step/vhc-save-step.module';
import { VhcSaveChecklistEntity } from 'src/modules/vhc-save-checklist/entities/vhc-save-checklist.entity';
import { VhcSaveStepEntity } from 'src/modules/vhc-save-step/entities/vhc-save-step.entity';
import { VhcSaveChecklistService } from 'src/modules/vhc-save-checklist/vhc-save-checklist.service';
import { VhcSaveStepService } from 'src/modules/vhc-save-step/vhc-save-step.service';
import { CustomerService } from 'src/services/customer/customer.service';
import { CustomerModule } from 'src/services/customer/customer.module';
import { VhcMainPictureService } from 'src/modules/vhc-main-picture/vhc-main-picture.service';
import { VhcMainPictureModule } from 'src/modules/vhc-main-picture/vhc-main-picture.module';
import { VhcMainPictureEntity } from 'src/modules/vhc-main-picture/entities/vhc-main-picture.entity';
import { AhistoryEntity } from 'src/modules/ahistory/entities/ahistory.entity';
import { AhistoryModule } from 'src/modules/ahistory/ahistory.module';
import { AhistoryService } from 'src/modules/ahistory/ahistory.service';
import { MinioClientService } from 'src/modules/minio-client/minio-client.service';
import { MinioClientModule } from 'src/modules/minio-client/minio-client.module';

@Module({
  imports: [
    VhcModule,
    VhcMasterModule,
    VhcSaveStepModule,
    VhcSaveChecklistModule,
    VhcMainPictureModule,
    CustomerModule,
    AhistoryModule,
    MinioClientModule,
    TypeOrmModule.forFeature([VhcMasterEntity]),
    TypeOrmModule.forFeature([VhcSaveChecklistEntity]),
    TypeOrmModule.forFeature([VhcSaveStepEntity]),
    TypeOrmModule.forFeature([VhcMainPictureEntity]),
    TypeOrmModule.forFeature([AhistoryEntity]),
  ],
  controllers: [GeneratePdfController],
  providers: [
    GeneratePdfService,
    VhcService,
    EmployeeService,
    VhcMasterService,
    VhcSaveChecklistService,
    VhcSaveStepService,
    CustomerService,
    VhcMainPictureService,
    AhistoryService,
  ],
})
export class GeneratePdfModule {}
