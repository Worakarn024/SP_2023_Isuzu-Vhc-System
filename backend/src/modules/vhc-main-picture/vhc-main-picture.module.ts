import { Module } from '@nestjs/common';
import { VhcMainPictureService } from './vhc-main-picture.service';
import { VhcMainPictureController } from './vhc-main-picture.controller';
import { VhcMainPictureEntity } from './entities/vhc-main-picture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VhcMainPictureEntity])],
  controllers: [VhcMainPictureController],
  providers: [VhcMainPictureService],
})
export class VhcMainPictureModule {}
