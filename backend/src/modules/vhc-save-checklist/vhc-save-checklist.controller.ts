import { Controller, Get, Param } from '@nestjs/common';
import { VhcSaveChecklistService } from './vhc-save-checklist.service';

@Controller('vhc-save-checklist')
export class VhcSaveChecklistController {
  constructor(
    private readonly vhcSaveChecklistService: VhcSaveChecklistService,
  ) {}

  @Get()
  findAll() {
    return this.vhcSaveChecklistService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.vhcSaveChecklistService.findOneById(+id);
  }
}
