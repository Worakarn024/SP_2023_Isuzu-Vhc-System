import { Controller, Get, Param } from '@nestjs/common';
import { VhcMasterService } from './vhc-master.service';

@Controller('vhc-master')
export class VhcMasterController {
  constructor(private readonly vhcMasterService: VhcMasterService) {}

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.vhcMasterService.findVhcMasterById(+id);
  }

  @Get('/:ahistory/:id')
  findAhistoryId(@Param('id') id: string) {
    return this.vhcMasterService.findAhistoryById(+id);
  }
}
