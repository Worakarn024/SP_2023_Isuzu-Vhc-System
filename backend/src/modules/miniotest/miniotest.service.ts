import { Injectable } from '@nestjs/common';
import { MinioClientService } from '../minio-client/minio-client.service';
import { Response } from 'express';

@Injectable()
export class MiniotestService {
  constructor(private readonly minioService: MinioClientService) {}

  testMinio() {
    return this.minioService.testMinioClient();
  }

  // getImgMinio(res, filename: string) {
  //   // console.log('this file name:' + filename);
  //   return this.minioService.getImg(res, filename);
  // }

  async getImgMinio(res: Response, filename: string): Promise<any> {
    try {
      console.log(filename);
      const stream = await this.minioService.getImg(filename);
      console.log(stream);
      stream.pipe(res);
    } catch (error) {
      console.log(error.message, JSON.stringify(error));
      return error;
      // throw new NotFoundException();
    }
  }

  putData(filename: string) {
    return this.minioService.putData(filename);
  }
}
