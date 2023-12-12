import { Controller, Get, Param } from '@nestjs/common';
import { VhcSaveProblemService } from './vhc-save-problem.service';

@Controller('vhc-save-problem')
export class VhcSaveProblemController {
  constructor(private readonly vhcSaveProblemService: VhcSaveProblemService) {}

  @Get()
  findAll() {
    return this.vhcSaveProblemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vhcSaveProblemService.findOneById(+id);
  }

  // @Get('/testminio')
  // testMinio() {
  //   return this.vhcSaveProblemService.testMinio();
  // }

  // @Get('/testImg')
  // getImg() {
  //   return this.vhcSaveProblemService.getImgMinio();
  // }
}
