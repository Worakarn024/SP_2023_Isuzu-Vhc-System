import { Module } from '@nestjs/common';
import { VhcService } from './vhc.service';
import { VhcController } from './vhc.controller';

@Module({
  controllers: [VhcController],
  providers: [VhcService],
  exports: [VhcService],
})
export class VhcModule {}
