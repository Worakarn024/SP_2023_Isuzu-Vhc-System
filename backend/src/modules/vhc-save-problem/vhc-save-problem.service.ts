import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VhcSaveProblemEntity } from './entities/vhc-save-problem.entity';
import { Repository } from 'typeorm';
// import { MinioClientService } from '../minio-client/minio-client.service';

@Injectable()
export class VhcSaveProblemService {
  constructor(
    @InjectRepository(VhcSaveProblemEntity)
    public repo: Repository<VhcSaveProblemEntity>, // private readonly minioService: MinioClientService,
  ) {}
  findAll(): Promise<VhcSaveProblemEntity[]> {
    return this.repo.find();
  }

  findOneById(id: number): Promise<VhcSaveProblemEntity> {
    return this.repo.findOneBy({ id: id });
  }

  // testMinio() {
  //   return this.minioService.testMinioClient();
  // }

  // getImgMinio() {
  //   return this.minioService.getImg();
  // }
}
