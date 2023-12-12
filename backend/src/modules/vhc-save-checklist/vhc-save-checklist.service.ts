import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VhcSaveChecklistEntity } from './entities/vhc-save-checklist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VhcSaveChecklistService {
  constructor(
    @InjectRepository(VhcSaveChecklistEntity)
    public repo: Repository<VhcSaveChecklistEntity>,
  ) {}
  findAll(): Promise<VhcSaveChecklistEntity[]> {
    return this.repo.find();
  }

  findOneById(vhc_master_id: number): Promise<VhcSaveChecklistEntity[]> {
    return this.repo.find({ where: { vhc_master_id: vhc_master_id } });
  }

  async getCheckList(vhcMasterId: number): Promise<VhcSaveChecklistEntity[]> {
    try {
      const checklist = await this.repo.find({
        where: { vhc_master_id: vhcMasterId },
      });
      return checklist;
    } catch (error) {
      throw new Error('CheckList not found');
    }
  }
}
