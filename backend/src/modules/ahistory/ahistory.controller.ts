import { Controller, Get, Param } from '@nestjs/common';
import { AhistoryService } from './ahistory.service';
import { AhistoryEntity } from './entities/ahistory.entity';

@Controller('ahistory')
export class AhistoryController {
  constructor(private readonly ahistoryService: AhistoryService) {}

  @Get()
  findAll() {
    return this.ahistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ahistoryService.getCarId(+id);
  }

  // @Get(':id') // This sets the route for this handler, e.g., '/customers/customer/:vhcMainId'
  // async getCarData(@Param('id') vhcMainId: number): Promise<AhistoryEntity[]> {
  //   return this.ahistoryService.getCarId(vhcMainId);
  // }
}
