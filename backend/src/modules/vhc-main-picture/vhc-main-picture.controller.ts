import { Controller, Get, Param } from '@nestjs/common';
import { VhcMainPictureService } from './vhc-main-picture.service';
import { VhcMainPictureEntity } from './entities/vhc-main-picture.entity';

@Controller('vhc-main-picture')
export class VhcMainPictureController {
  constructor(private readonly vhcMainPictureService: VhcMainPictureService) {}

  @Get()
  findAll() {
    return this.vhcMainPictureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vhcMainPictureService.findOneById(+id);
  }

  @Get('/data/:vhcMainId')
  async getCustomerData(
    @Param('vhcMainId') vhcMainId: number,
  ): Promise<VhcMainPictureEntity> {
    return this.vhcMainPictureService.getMainPicture(vhcMainId);
  }
}
