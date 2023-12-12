import { Module } from '@nestjs/common';
import { MiniotestService } from './miniotest.service';
import { MiniotestController } from './miniotest.controller';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [MinioClientModule],
  controllers: [MiniotestController],
  providers: [MiniotestService],
})
export class MiniotestModule {}
