import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneratePdfModule } from './generate-pdf/generate-pdf.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VhcMasterModule } from './modules/vhc-master/vhc-master.module';
import { VhcMainPictureModule } from './modules/vhc-main-picture/vhc-main-picture.module';
import { VhcSaveStepModule } from './modules/vhc-save-step/vhc-save-step.module';
import { VhcSaveChecklistModule } from './modules/vhc-save-checklist/vhc-save-checklist.module';
import { VhcSaveProblemModule } from './modules/vhc-save-problem/vhc-save-problem.module';
import { VhcModule } from './services/vhc/vhc.module';
import { EmployeeModule } from './services/employee/employee.module';
import { CustomerModule } from './services/customer/customer.module';
import { AhistoryModule } from './modules/ahistory/ahistory.module';
import { MinioClientModule } from './modules/minio-client/minio-client.module';
import { MiniotestModule } from './modules/miniotest/miniotest.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 7009),
        username: configService.get('DB_USER', 'username'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_DATABASE', 'database'),
        logging: 'all',
        entities: ['./dist/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    GeneratePdfModule,
    VhcModule,
    EmployeeModule,
    VhcMasterModule,
    VhcMainPictureModule,
    VhcSaveStepModule,
    VhcSaveChecklistModule,
    VhcSaveProblemModule,
    CustomerModule,
    AhistoryModule,
    MinioClientModule,
    MiniotestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
