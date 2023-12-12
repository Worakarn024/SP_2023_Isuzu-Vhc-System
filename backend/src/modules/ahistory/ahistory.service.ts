import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AhistoryEntity } from './entities/ahistory.entity';
import { Repository } from 'typeorm';
import { VhcMasterService } from '../vhc-master/vhc-master.service';

@Injectable()
export class AhistoryService {
  constructor(
    @InjectRepository(AhistoryEntity)
    public repo: Repository<AhistoryEntity>,
  ) {}
  findAll(): Promise<AhistoryEntity[]> {
    return this.repo.find();
  }

  findOneById(id: number): Promise<AhistoryEntity> {
    return this.repo.findOneBy({ id: id });
  }

  getCarId(id: number): Promise<AhistoryEntity> {
    try {
      const carId = this.repo.findOneBy({ id: id });
      return carId;
    } catch (error) {
      throw new Error('Ahistory not found');
    }
  }

  // async getCheckList(vhc_master_id: number): Promise<VhcSaveChecklistEntity[]> {
  //   return this.repo.find({ where: { vhc_master_id: vhc_master_id } });
  // }
}
