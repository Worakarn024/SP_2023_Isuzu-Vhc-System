/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VhcMasterEntity } from './entities/vhc-master.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VhcMasterService {
  constructor(
    @InjectRepository(VhcMasterEntity)
    public repo: Repository<VhcMasterEntity>,
  ) {}
  async findVhcMasterById(vhcMasterId: number): Promise<VhcMasterEntity> {
    try {
      const vhcMaster = await this.repo.findOne({ where: { id: vhcMasterId } });
      return vhcMaster;
    } catch (error) {
      console.error('Error in findVhcMasterById:', error);
      throw new Error('Error in findVhcMasterById:' + error.message);
    }
  }

  async getEmployeeDetailById(create_by: string): Promise<VhcMasterEntity> {
    return this.repo.findOne({ where: { create_by: create_by } });
  }

  async findAhistoryById(id: number): Promise<VhcMasterEntity[]> {
    try {
      const ahistoryId = await this.repo.find({ where: { ahistory_id: id } });
      console.log(ahistoryId);
      return ahistoryId;
    } catch (error) {
      console.error('Error in ahistoryId:', error);
      throw new Error('Error in ahistoryId:' + error.message);
    }
  }
}
