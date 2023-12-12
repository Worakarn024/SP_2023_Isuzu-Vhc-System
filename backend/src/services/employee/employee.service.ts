import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  private readonly axiosInstance: AxiosInstance;
  private readonly apiUrl: string;
  private readonly apiToken: string;

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

  async getEmployeeData(): Promise<EmployeeDto> {
    try {
      const username = 'จิราพร';
      const password = 112233;
      const position = 'SSSV103302';
      const response = await this.axiosInstance.get(
        `/Login/checklogin?username=${username}&password=${password}&position=${position}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response) {
          // The request was made, and the server responded with a status code
          console.error(
            `HTTP error: ${error.response.status} - ${error.response.statusText}`,
          );
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received');
        } else {
          // Something went wrong while setting up the request
          console.error('Error setting up the request:', error.message);
        }
      } else {
        // Handle non-Axios errors
        console.error('Non-Axios error:', error.message);
      }
      throw new Error('Error getting Employee');
    }
  }
}
