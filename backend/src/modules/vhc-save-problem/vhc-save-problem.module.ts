import { Module } from '@nestjs/common';
import { VhcSaveProblemService } from './vhc-save-problem.service';
import { VhcSaveProblemController } from './vhc-save-problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VhcSaveProblemEntity } from './entities/vhc-save-problem.entity';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VhcSaveProblemEntity]),
    MinioClientModule,
  ],
  controllers: [VhcSaveProblemController],
  providers: [VhcSaveProblemService],
})
export class VhcSaveProblemModule {}
