/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { VhcDto } from './dto/vhc.dto';
import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';
import { CustomerDto } from './dto/customer.dto';
import { CheckListDto } from './dto/check-list.dto';

@Injectable()
export class VhcService {
  private readonly axiosInstance: AxiosInstance;
  private readonly apiUrl: string;
  private readonly apiToken: string;
  private cvhc_main_ids = 420261;

  constructor() {
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

  async getVhcData(): Promise<VhcDto> {
    try {
      const response = await this.axiosInstance.get(
        `/vhc_v2/getVhcbyid?cvhc_main_id=${this.cvhc_main_ids}`,
      );
      const data = response.data[0];
      data.hbg_sticker =
        data.hbg_sticker === 0 ? 'ติดสติ๊กเกอร์นก' : 'ไม่ติดสติ๊กเกอร์นก';
      if (data.customer_signature === null || data.sa_vhc_signature === null) {
        (data.customer_signature =
          'src/generate-pdf/assets/img/exampleSignature.png'),
          (data.sa_vhc_signature =
            'src/generate-pdf/assets/img/exampleSignature.png');
      }
      for (let i = 1; i <= 8; i++) {
        if (data[`mainpicture_picture${i}`] === null) {
          data[`mainpicture_picture${i}`] =
            'src/generate-pdf/assets/img/exampleCar.png';
        }
      }
      // console.log(data.cvhc_main_id);
      return data;
    } catch (error) {
      throw new Error('Error data not found');
    }
  }

  async getCustomerData(): Promise<CustomerDto> {
    try {
      const vhc = await this.getVhcData();
      const response = await this.axiosInstance.get(
        `/Car/getcarowner?CusNo=${vhc.cus_id}`,
      );
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
      throw new Error('Error data not found');
    }
  }

  async getCheckList(): Promise<CheckListDto> {
    try {
      const response = await this.axiosInstance.get(
        `/vhc_v2/getChecklist?cvhc_main_id=${this.cvhc_main_ids}`,
      );

      const options = response.data;

      // Loop through the options and update the option_name based on the option_value
      options.forEach((option) => {
        option.option_value = option.option_value === 0 ? 'ปกติ' : 'ไม่ปกติ';
        if (option.option_image === null) {
          option.option_image = 'src/generate-pdf/assets/img/exampleCar.png';
        }
      });

      // console.log(options[0]);
      return options;
    } catch (error) {
      throw new Error('Error data not found');
    }
  }
}
