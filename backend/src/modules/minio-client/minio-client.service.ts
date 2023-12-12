/* eslint-disable no-var */
import { Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';

import { BufferedFile, UploadFile } from './file.model';

import * as crypto from 'crypto';
import * as moment from 'moment';
import { Readable } from 'typeorm/platform/PlatformTools';

import * as fs from 'fs';

@Injectable()
export class MinioClientService {
  private readonly logger = new Logger('MinioClientService');
  private readonly baseBucket: string;

  constructor(
    private readonly minio: MinioService,
    private readonly configService: ConfigService,
  ) {
    this.baseBucket = this.configService.get('MINIO_BUCKET');
  }

  async testMinioClient() {
    try {
      const buckets = await this.minio.client.listBuckets();
      console.log('Success', buckets);
      return buckets;
    } catch (err) {
      console.log(err.message);
    }
  }

  // async getImg(filename: string): Promise<Buffer> {
  //   return new Promise((resolve, reject) => {
  //     this.minio.client.getObject(
  //       'photo',
  //       filename,
  //       function (err, dataStream) {
  //         let buffer: Buffer;
  //         if (err) {
  //           return console.log(err);
  //         }
  //         dataStream.on('data', function (chunk) {
  //           buffer = chunk;
  //         });
  //         dataStream.on('end', function () {
  //           return resolve(buffer);
  //         });
  //         dataStream.on('error', function (err) {
  //           console.log(err);
  //         });
  //       },
  //     );
  //   });
  // }

  async getImg(filename: string): Promise<Readable> {
    return new Promise((resolve, reject) => {
      try {
        this.minio.client.getObject(
          'photo',
          filename,
          (error: any, stream: Readable) => {
            if (error) {
              this.logger.error(error);
              reject(error);
            }
            console.log(stream);
            resolve(stream);
          },
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  putData(filename: string) {
    return new Promise(async (resolve, reject) => {
      try {
        var file = filename;
        var fileStream = fs.createReadStream(file);
        var fileStat = fs.stat(file, function (err, stats) {
          if (err) {
            return console.log(err);
          }
          return stats.size;
        });
        console.log('this filename:' + filename);
        this.minio.client.putObject(
          'photo',
          filename,
          fileStream,
          fileStat,
          function (err, objInfo) {
            if (err) {
              return console.log(err); // err should be null
            }
            console.log('Success', objInfo);
            // delete file in local
            fs.unlink(filename, (err) => {
              if (err) throw err;
              console.log('path/file.txt was deleted');
            });
          },
        );
        resolve(true);
      } catch (error) {
        this.logger.error(error.message, JSON.stringify(error));
        reject(error);
      }
    });
  }

  async upload(file: BufferedFile, folder = 'upload'): Promise<UploadFile> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.isFormatMimetypeImage(file.mimetype)) {
          return reject('Error uploading file: isFormatMimetypeImage');
        }
        const tempFilename = Date.now().toString();
        const hashedFileName = crypto
          .createHash('md5')
          .update(tempFilename)
          .digest('hex');
        const ext = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
          file.originalname.length,
        );

        const month = moment().format('YYYY-MM');
        const filename = hashedFileName + ext;
        const path = `${folder}/${month}/${filename}`;
        const fileBuffer = file.buffer;

        this.minio.client.putObject(
          this.baseBucket,
          path,
          fileBuffer,
          (error: any, etag: any) => {
            if (error) {
              return reject('Error uploading file: putObject');
            }
            const result = {
              path,
              size: file.size,
              encoding: file.encoding,
              originalname: file.originalname,
              mimetype: file.mimetype,
            };

            return resolve(result);
          },
        );
      } catch (error) {
        this.logger.error(error, JSON.stringify(error));
        return reject(error);
      }
    });
  }

  async uploadByBase64(file: string, folder = 'upload'): Promise<UploadFile> {
    return new Promise((resolve, reject) => {
      try {
        const [header, body] = file.split(',');
        const [mimetypeText, type] = header.split(';');
        const extension = mimetypeText.replace('data:image/', '');
        const mimetype = mimetypeText.replace('data:', '');
        const buffer = Buffer.from(body, 'base64');
        const size = (body.length / 4) * 3;
        // filename
        const tempFilename = Date.now().toString();
        const hashedFileName = crypto
          .createHash('md5')
          .update(tempFilename)
          .digest('hex');
        const month = moment().format('YYYY-MM');
        const filename = `${hashedFileName}.${extension}`;
        const path = `${folder}/${month}/${filename}`;
        this.minio.client.putObject(
          this.baseBucket,
          path,
          buffer,
          { 'Content-Type': mimetype },
          (error: any, etag: any) => {
            if (error) {
              return reject('Error uploading file: uploadByBase64');
            }

            const result = {
              path,
              mimetype,
              size,
            };

            return resolve(result);
          },
        );
      } catch (error) {
        this.logger.error(error.message, JSON.stringify(error));
        reject(error);
      }
    });
  }

  private isFormatMimetypeImage(mimetype: string) {
    return (
      mimetype.includes('jpg') ||
      mimetype.includes('jpeg') ||
      mimetype.includes('png')
    );
  }
}
