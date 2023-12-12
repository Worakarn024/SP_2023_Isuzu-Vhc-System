import { Controller, Get, Param } from '@nestjs/common';
import { VhcSaveStepService } from './vhc-save-step.service';

@Controller('vhc-save-step')
export class VhcSaveStepController {
  constructor(private readonly vhcSaveStepService: VhcSaveStepService) {}

  @Get()
  findAll() {
    return this.vhcSaveStepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vhcSaveStepService.findOneById(+id);
  }
}
