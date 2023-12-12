import { Injectable } from '@nestjs/common';
import { VhcSaveStepEntity } from './entities/vhc-save-step.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VhcSaveStepService {
  constructor(
    @InjectRepository(VhcSaveStepEntity)
    public repo: Repository<VhcSaveStepEntity>,
  ) {}
  findAll(): Promise<VhcSaveStepEntity[]> {
    return this.repo.find();
  }

  findOneById(id: number): Promise<VhcSaveStepEntity> {
    return this.repo.findOneBy({ id: id });
  }

  async getStepComment(vhcMaster: number): Promise<VhcSaveStepEntity> {
    return this.repo.findOne({ where: { id: vhcMaster } });
  }
}
