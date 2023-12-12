/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';
import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';
import { VhcMasterService } from 'src/modules/vhc-master/vhc-master.service';

@Injectable()
export class CustomerService {
  private readonly axiosInstance: AxiosInstance;
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor(private readonly vhcMasterService: VhcMasterService) {
    dotenv.config();
    this.apiUrl = process.env.API_URL;
    this.apiToken = process.env.API_KEY;

    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'x-api-key': this.apiToken,
      },
    });
  }

  // async getCustomerData(vhcMainId: number): Promise<CustomerDto> {
  //   try {
  //     const VhcMaster = await this.vhcMasterService.findVhcMasterById(
  //       vhcMainId,
  //     );
  //     const response = await this.axiosInstance.get(
  //       `/Car/getcarowner?CusNo=${VhcMaster.cvhc_main_id}`,
  //     );
  //     const data = response.data;
  //     data.hbg_sticker =
  //       data.hbg_sticker === 0 ? 'ติดสติ๊กเกอร์นก' : 'ไม่ติดสติ๊กเกอร์นก';
  //     if (data.customer_signature === null || data.sa_vhc_signature === null) {
  //       (data.customer_signature =
  //         'src/generate-pdf/assets/img/exampleSignature.png'),
  //         (data.sa_vhc_signature =
  //           'src/generate-pdf/assets/img/exampleSignature.png');
  //     }
  //     for (let i = 1; i <= 8; i++) {
  //       if (data[`mainpicture_picture${i}`] === null) {
  //         data[`mainpicture_picture${i}`] =
  //           'src/generate-pdf/assets/img/exampleCar.png';
  //       }
  //     }
  //     return data;
  //   } catch (error) {
  //     throw new Error('Error data not found');
  //   }
  // }

  async getMainCusData(vhcMainId: number): Promise<CustomerDto> {
    try {
      const VhcMaster = await this.vhcMasterService.findVhcMasterById(
        vhcMainId,
      );
      const response = await this.axiosInstance.get(
        `/Car/getcarowner?CusNo=${VhcMaster.cus_id}`,
      );
      console.log('cus_id =' + VhcMaster.cus_id);
      const data = response.data;
      for (const key in data) {
        if (typeof data[key] === 'string' && data[key].includes('_')) {
          const parts = data[key].split('_');
          data[key] = parts[parts.length - 1];
        }
      }

      // console.log(data);
      return data;
    } catch (error) {
      throw new Error('Customer data not found:' + error.message);
    }
  }
}
