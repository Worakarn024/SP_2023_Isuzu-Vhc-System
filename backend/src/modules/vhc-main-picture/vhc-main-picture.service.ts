import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VhcMainPictureEntity } from './entities/vhc-main-picture.entity';
import { Repository } from 'typeorm';
import { VhcMasterService } from 'src/modules/vhc-master/vhc-master.service';

@Injectable()
export class VhcMainPictureService {
  private readonly vhcMasterService: VhcMasterService;
  constructor(
    @InjectRepository(VhcMainPictureEntity)
    public repo: Repository<VhcMainPictureEntity>,
  ) {}

  findAll(): Promise<VhcMainPictureEntity[]> {
    return this.repo.find();
  }

  findOneById(id: number): Promise<VhcMainPictureEntity> {
    return this.repo.findOneBy({ id: id });
  }

  async getMainPicture(vhcMasterId: number): Promise<VhcMainPictureEntity> {
    try {
      const data = await this.repo.findOne({
        where: { vhc_master_id: vhcMasterId },
      });
      // for (let i = 1; i <= 8; i++) {
      //   if (data[`mainpicture_picture${i}`] === null) {
      //     data[`mainpicture_picture${i}`] =
      //       'src/generate-pdf/assets/img/exampleCar.png';
      //   }
      // }
      // for (let i = 1; i <= 8; i++) {
      //   data[`mainpicture_picture${i}`] =
      //     'src/generate-pdf/assets/img/exampleCar.png';
      // }
      return data;
    } catch (error) {
      throw new Error('Failed to get main picture');
    }
  }
}
