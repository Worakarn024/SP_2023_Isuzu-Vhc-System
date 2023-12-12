import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { MiniotestService } from './miniotest.service';
import { Response } from 'express';

@Controller('miniotest')
export class MiniotestController {
  constructor(private readonly miniotestService: MiniotestService) {}

  @Get('/testminio')
  testMinio() {
    return this.miniotestService.testMinio();
  }

  // @Get('/testImg/:filename')
  // getImg(@Param('filename') filename: string) {
  //   console.log('this file name:' + filename);
  //   return this.miniotestService.getImgMinio(filename);
  // }

  @Get('/testImg/:filename')
  showImage(@Param('filename') filename: string, @Res() res: Response): any {
    console.log(filename);
    return this.miniotestService.getImgMinio(res, filename);
  }

  @Get('/testdata/:filename')
  putData(@Param('filename') filename: string) {
    return this.miniotestService.putData(filename);
  }
}
