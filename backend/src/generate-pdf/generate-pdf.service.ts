import { Injectable, Logger } from '@nestjs/common';
import { EmployeeService } from 'src/services/employee/employee.service';
import { VhcSaveChecklistService } from 'src/modules/vhc-save-checklist/vhc-save-checklist.service';
import { VhcMasterService } from 'src/modules/vhc-master/vhc-master.service';
import { CustomerService } from 'src/services/customer/customer.service';
import { VhcMainPictureService } from 'src/modules/vhc-main-picture/vhc-main-picture.service';
import { AhistoryService } from 'src/modules/ahistory/ahistory.service';
import { MinioClientService } from 'src/modules/minio-client/minio-client.service';

import * as PdfPrinter from 'pdfmake';
import * as path from 'path';
import * as fs from 'fs';
import * as moment from 'moment';
import * as _ from 'lodash';
import { throwError } from 'rxjs';

@Injectable()
export class GeneratePdfService {
  private logger = new Logger('GeneratePdfService');
  private readonly rootPath = 'src/pdf-file';

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly vhcMasterService: VhcMasterService,
    private readonly saveListService: VhcSaveChecklistService,
    private readonly customerService: CustomerService,
    private readonly vhcMainPictureService: VhcMainPictureService,
    private readonly ahistoryService: AhistoryService,
    private readonly minioService: MinioClientService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  generatePdf(template: any, filename: string, options = {}): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const fonts = {
          THSarabunNew: {
            normal: path.resolve('src', 'shared', 'fonts', 'THSarabunNew.ttf'),
            bold: path.resolve(
              'src',
              'shared',
              'fonts',
              'THSarabunNew-Bold.ttf',
            ),
            italics: path.resolve(
              'src',
              'shared',
              'fonts',
              'THSarabunNew-Italic.ttf',
            ),
            bolditalics: path.resolve(
              'src',
              'shared',
              'fonts',
              'THSarabunNew-BoldItalic.ttf',
            ),
          },
        };
        // console.log(path);
        // console.log(this.rootPath);
        const printer = new PdfPrinter(fonts);
        const pdfDoc = await printer.createPdfKitDocument(template, options);
        const writeStream = await fs.createWriteStream(filename);
        await pdfDoc.pipe(writeStream);
        pdfDoc.end();

        writeStream.on('finish', function () {
          resolve(true);
        });
      } catch (error) {
        this.logger.error(error.message, JSON.stringify(error));
        reject(error);
      }
    });
  }

  generatePdfExample(id): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const VhcMaster = await this.vhcMasterService.findVhcMasterById(id);
        const carId = await this.ahistoryService.getCarId(
          VhcMaster.ahistory_id,
        );
        const customer = await this.customerService.getMainCusData(
          VhcMaster.id,
        );
        const vhcImg = await this.vhcMainPictureService.getMainPicture(
          VhcMaster.id,
        );
        const checkList = await this.saveListService.getCheckList(VhcMaster.id);

        const sticker =
          VhcMaster.hbg_sticker === 1
            ? 'ติดสติ๊กเกอร์นก'
            : 'ไม่ติดสติ๊กเกอร์นก';

        const comeInDate =
          'วันที่เข้ารับบริการ ' +
          moment(VhcMaster.vhc_date).format('DD-MM-YYYY') +
          ' เวลาที่เข้ารับบริการ ' +
          VhcMaster.vhc_time;
        const template = {
          pageSize: 'A4',
          pageMargins: [30, 220, 40, 40],
          header: {
            margin: 30,
            stack: [
              [
                {
                  text: 'ใบตรวจเช็คสภาพรถเบื้องต้น (VHC)',
                  style: 'header',
                  alignment: 'center',
                },
                {
                  text: 'บริษัท อีซูซุเชียงรายบริการ (2002) จํากัด(สาขาศรีทรายมูล)',
                  style: 'subHeader',
                  alignment: 'center',
                  bold: true,
                },
                {
                  text: '145/1 หมู่ที่ 17 ถนนซุปเปอร์ไฮเวย์ ตําบลรอบเวียง อําเภอเมืองเชียงราย จังหวัดเชียงราย 57000',
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                },
                {
                  text: 'โทร 0-5371-6981, 0-5371-1605 แฟกซ์ 0-5371-3765 ',
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                },
              ],
              [
                {
                  text: `คันที่ ${VhcMaster.running_queue} ${sticker}`,
                  alignment: 'right',
                  fontSize: 12,
                  bold: true,
                },
                {
                  text: comeInDate,
                  alignment: 'right',
                  fontSize: 12,
                  bold: true,
                },
              ],
              [
                {
                  table: {
                    widths: ['60%', '40%'],
                    body: [
                      [
                        {
                          text: `ชื่อลูกค้า: ${customer.Cus_Name} ${
                            customer.Cus_Surename
                          }\nที่อยู่: ${customer.C_Add || '-'} หมู่บ้าน ${
                            customer.C_Vill || '-'
                          } ต.${customer.C_Tum} อ.${customer.C_Amp} จ.${
                            customer.C_Pro
                          } รหัสไปรษณีย์ ${customer.C_Code} \nโทรศัพท์: ${
                            customer.M_Tel
                          }`,
                          bold: true,
                          border: [false, true, true, true],
                        },
                        {
                          text:
                            'รุ่นรถ: ' +
                            VhcMaster.model_name +
                            '\nทะเบียนรถ: ' +
                            carId.register +
                            '\nเลขเครื่อง: ' +
                            VhcMaster.engin_id +
                            '\nเลขแชสซี: ' +
                            VhcMaster.chassis +
                            '\nเลขกิโลเมตรเข้ารับบริการ: ' +
                            VhcMaster.mile_in,
                          bold: true,
                          border: [true, true, false, true],
                        },
                      ],
                    ],
                  },
                },
              ],
            ],
          },

          footer: function (currentPage: number, pageCount: number) {
            return [
              // {
              //   canvas: [
              //     {
              //       type: 'line',
              //       x1: 0,
              //       y1: 5,
              //       x2: 595 - 2 * 40,
              //       y2: 5,
              //       lineWidth: 1,
              //     },
              //   ],
              //   margin: [20, 0],
              // },
              // {
              //   text: '\n',
              //   fontSize: 2,
              // },
              {
                stack: [
                  {
                    width: '*',
                    text: '* กรุณานำสิ่งของมีค่าออกจากรถของท่านก่อนส่งมอบงานให้ช่าง และกรุณาตรวจสอบทรัพย์สินของท่านก่อนนำรถออกจากบริษัท (ทางบริษัทขอสงวนสิทธิ์ในการรับผิดชอบการสูญหายใดๆทั้งสิ้น)',
                    alignment: 'center',
                    fontSize: 10,
                  },
                  {
                    width: 40,
                    text: `${currentPage}/${pageCount}`,
                    alignment: 'center',
                  },
                ],
                margin: [20, 0],
              },
            ];
          },
          content: [],
          defaultStyle: null,
          styles: null,
        };

        // หัวข้อ PDF
        // template.content.push(
        //   {
        //     text: 'ใบตรวจเช็คสภาพรถเบื้องต้น (VHC)',
        //     style: 'header',
        //     alignment: 'center',
        //   },
        //   {
        //     text: '\n',
        //     fontSize: 2,
        //   },
        // );

        // ชื่อบริษัท
        // const organization =
        //   await this.organizationService.getWorkingCompanyById('123');
        // this.logger.debug(
        //   JSON.stringify(organization),
        //   'Show Data: organization',
        // );
        // template.content.push(
        //   {
        //     text: organization.name,
        //     style: 'subHeader',
        //     alignment: 'center',
        //   },
        //   {
        //     text: '\n',
        //     fontSize: 18,
        //   },
        // );

        // // ที่อยู่บริษัท & เบอร์โทร
        // const telephoneAndFax = `โทร. ${organization.tel?.trim()} แฟกซ์. ${organization.fax?.trim()}`;
        // template.content.push(
        //   {
        //     columns: [
        //       {
        //         width: '60%',
        //         text: '145/1 หมู่ที่ 17 ถนนซุปเปอร์ไฮเวย์ ตําบลรอบเวียง อําเภอเมืองเชียงราย จังหวัดเชียงราย 57000',
        //         alignment: 'left',
        //         fontSize: 12,
        //       },
        //       {
        //         width: '40%',
        //         text: 'โทร 0-5371-6981, 0-5371-1605 แฟกซ์ 0-5371-3765',
        //         alignment: 'right',
        //         fontSize: 12,
        //       },
        //     ],
        //   },
        //   {
        //     text: '\n',
        //     fontSize: 5,
        //   },
        // );

        // ข้อมูลทั่วไป
        // const customer = data.custNo
        //   ? await this.customerApiService.getOneById(data.custNo, accessToken)
        //   : undefined;
        // this.logger.debug(JSON.stringify(customer), 'Show Data: customer');
        // const ahistory = await this.ahistoryService.findOne(data.ahistoryId);
        // this.logger.debug(JSON.stringify(ahistory), 'Show Data: ahistory');
        // const abranch = ahistory
        //   ? await this.abrandService.findOne(ahistory?.aBrandId)
        //   : undefined;
        // this.logger.debug(JSON.stringify(abranch), 'Show Data: abranch');
        // const engineAndChassis = `เลขเครื่อง: ${
        //   data.engineNumber || '-'
        // } \n เลขแซสซี: ${data.chassis || '-'}`;
        // const carModelAndRegisterPlate = `ยี่ห้อ: ${
        //   'abranch?.name' || '-'
        // } \n ป้ายทะเบียน: ${data.licensePlate || '-'} \n รุ่นรถ: ${
        //   data.fullModelName || '-'
        // }`;
        // const engineAndChassis = `เลขเครื่อง RF5617 \nเลขแชสซี \nMP1TFR87JHG040416 `;
        // const carModelAndRegisterPlate = `รุ่นรถ TFR87JCRH6UM ทะเบียน กล 4351`;
        // const customerDetails = `ชื่อลูกค้า โสรญา วงค์ดวง ที่อยู่ 72 ม.7 หมู่บ้าน - ต.เมืองชุม อ.เวียงชัย จ.เชียงราย \nรหัสไปรษณีย์ 57210 โทรศัพท์ 0861894854`;
        // // const comeInDate = data.preVhcDate
        // //   ? `วันที่เข้ารับบริการ: ${moment(data.preVhcDate).format(
        // //       'YYYY-MM-DD',
        // //     )} เวลาที่เข้ารับบริการ: ${moment(data.preVhcDate).format(
        // //       'HH:mm:ss',
        // //     )}`
        // //   : undefined;
        // const comeInDate = `วันที่เข้ารับบริการ 2023-03-21 เวลาที่เข้ารับบริการ 08:26:00`;
        // const queueCarAndSticker = `คันที่ R2 \nติดสติกเกอร์นก`;
        // const mileIn = `เลขกิโลเมตรเข้ารับบริการ \n140232`;
        // // template.content.push(
        //   {
        //     style: 'tableGeneralDetails',
        //     table: {
        //       widths: ['*', 100, 100],
        //       body: [
        //         [customerDetails, carModelAndRegisterPlate, engineAndChassis],
        //         // [customerDetails, carModelAndRegisterPlate, engineAndChassis],
        //         [comeInDate, queueCarAndSticker, mileIn],
        //       ],
        //     },
        //   },
        //   {
        //     text: '\n',
        //     fontSize: 14,
        //   },
        // );

        // ตาราง รายการอะไหล่/ค่าแรง
        // template.content.push({
        //   text: 'รายการอะไหล่/ค่าแรง:',
        //   fontSize: 14,
        //   alignment: 'left',
        //   style: 'tableHeaderList',
        // });
        // const tablePreVhcList = await this.generateTemplatePreVhcList(data);
        // this.logger.debug(JSON.stringify(tableList), 'Show Data: tableList')
        // template.content.push(tablePreVhcList);

        // รายการซ่อมเพิ่มเติม
        try {
          template.content.push(
            {
              text: '\n',
              fontSize: 5,
            },
            {
              text: 'หมายเหตุเพิ่มเติม',
              alignment: 'left',
              fontSize: 12,
              bold: true,
            },
            {
              ol: [
                {
                  text: VhcMaster.comment,
                  listType: 'none',
                  fontSize: 11,
                },
              ],
            },
          );
        } catch (error) {
          throw new Error('Comment not found: ' + error.message);
        }

        //13 Step
        const checkListData = checkList.map((option) => {
          if (option.check_status === 0) {
            return [
              `${option.vhc_checklist_name}: ไม่ปกติ`,
              {
                ol: ['รายละเอียดเพิ่มเติม: ' + option.check_comment],
                type: 'none',
              },
            ];
          }
          return `${option.vhc_checklist_name}: ปกติ`;
        });

        try {
          template.content.push(
            {
              text: '\n',
              fontSize: 5,
            },
            {
              text: 'รายการตรวจสภาพเบื้องต้น',
              fontSize: 12,
              bold: true,
            },
            {
              ol: checkListData,
              fontSize: 11,
            },
          );
        } catch (error) {
          throw new Error('Checklist 13 Step not found');
        }

        template.content.push(
          {
            text: '\n',
            fontSize: 5,
          },
          {
            text: 'ลายเซ็น',
            alignment: 'left',
            fontSize: 12,
            bold: true,
          },
          {
            text: '\n',
            fontSize: 10,
          },
        );

        const employeeData = await this.employeeService.getEmployeeData();
        const nameEmployee = `${employeeData.Name} ${employeeData.Surname}`;
        const signatureImg =
          VhcMaster.sa_vhc_signature === null ||
          VhcMaster.customer_signature === null
            ? {
                customer_signature:
                  'src/generate-pdf/assets/img/exampleSignature.png',
                sa_vhc_signature:
                  'src/generate-pdf/assets/img/exampleSignature.png',
              }
            : null;
        // VhcMaster.path_sa_signature =
        //   'src/generate-pdf/uploads/2023-11-16/161787/signature/2023_11_16T16_41_37_sa.png';
        // console.log('thislog : ' + VhcMaster.path_sa_signature);
        // console.log('log2 : ' + VhcMaster.path_customer_signature);
        const srcPath = 'src/generate-pdf/';

        try {
          template.content.push(
            {
              // layout: {
              //   hLineColor: function (i, node) {
              //     return 'gray';
              //   },
              //   vLineColor: function (i, node) {
              //     return 'gray';
              //   },
              //   hLineStyle: function (i, node) {
              //     if (i === node.table.length) {
              //       return null;
              //     }
              //     return { dash: { length: 1, space: 2 } };
              //   },
              //   vLineStyle: function (i, node) {
              //     if (
              //       i === node.table.widths.length &&
              //       i === node.table.heights.length
              //     ) {
              //       return null;
              //     }
              //     return { dash: { length: 1, space: 2 } };
              //   },
              // },
              layout: 'noBorders',
              margin: [32, 0, 0, 0],
              table: {
                widths: ['45%', '5%', '45%'],
                heights: function (row) {
                  if (row === 0) {
                    return 50;
                  }
                  return 'auto';
                },
                body: [
                  [
                    {
                      image: srcPath + VhcMaster.path_sa_signature,
                      // image: signatureImg.sa_vhc_signature,
                      alignment: 'center',
                      fit: [110, 110],
                    },
                    { text: '', border: [true, false, true, false] },
                    {
                      image: srcPath + VhcMaster.path_customer_signature,
                      // image: signatureImg.customer_signature,
                      alignment: 'center',
                      fit: [110, 110],
                    },
                  ],
                ],
              },
            },
            {
              margin: [32, 0, 0, 0],
              layout: 'noBorders',
              table: {
                widths: ['45%', '5%', '45%'],
                body: [
                  [
                    {
                      stack: [
                        {
                          text: '\n',
                          alignment: 'center',
                          fontSize: 5,
                          bold: false,
                        },
                        {
                          text: nameEmployee,
                          alignment: 'center',
                          fontSize: 12,
                          bold: false,
                        },
                        {
                          text: '\n',
                          alignment: 'center',
                          fontSize: 3,
                          bold: false,
                        },
                        {
                          columns: [
                            {
                              width: '*',
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 17,
                                  y1: -2,
                                  x2: 200,
                                  y2: -2,
                                  lineWidth: 0.1,
                                },
                              ],
                            },
                          ],
                        },
                        {
                          text: '\n',
                          alignment: 'center',
                          fontSize: 3,
                          bold: false,
                        },
                        {
                          text: 'ตรวจสอบเบื้องต้นโดย SA',
                          alignment: 'center',
                          fontSize: 12,
                          bold: true,
                        },
                      ],
                    },
                    { text: '', border: [true, false, true, false] },
                    {
                      stack: [
                        {
                          text: '\n',
                          alignment: 'center',
                          fontSize: 5,
                          bold: false,
                        },
                        {
                          text: `${customer.Cus_Name} ${customer.Cus_Surename}`,
                          alignment: 'center',
                          fontSize: 12,
                          bold: false,
                        },
                        {
                          text: '\n',
                          alignment: 'center',
                          fontSize: 3,
                          bold: false,
                        },
                        {
                          columns: [
                            {
                              width: '*',
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 17,
                                  y1: -2,
                                  x2: 200,
                                  y2: -2,
                                  lineWidth: 0.1,
                                },
                              ],
                            },
                          ],
                        },
                        {
                          text: '\n',
                          alignment: 'center',
                          fontSize: 3,
                          bold: false,
                        },
                        {
                          text: 'เจ้าขอรถ/ตัวแทน',
                          alignment: 'center',
                          fontSize: 12,
                          bold: true,
                        },
                      ],
                    },
                  ],
                ],
              },
              pageBreak: 'after',
            },
          );
        } catch (error) {
          throw new Error('signature not found');
        }

        //รายการตรวจสภาพเบื้องต้น 13 ข้อ
        //หัวข้อ
        template.content.push(
          {
            text: '\n',
            fontSize: 10,
          },
          {
            text: 'รายการตรวจสภาพเบื้องต้น',
            alignment: 'left',
            fontSize: 12,
            bold: true,
          },
          {
            text: '\n',
            fontSize: 5,
          },
        );

        //รายละเอียด
        const checkListWithImg = checkList.map((option) => {
          if (option.check_status === 0) {
            return {
              stack: [
                `${option.vhc_checklist_name}: ไม่ปกติ`,
                {
                  table: {
                    widths: ['50%', '50%'],
                    heights: function (row) {
                      if (row === 0) {
                        return 45;
                      }
                      return 'auto';
                    },
                    body: [
                      [
                        {
                          image: srcPath + option.path_check_image,
                          // option.check_image ||
                          // 'src/generate-pdf/assets/img/exampleCar.png',
                          alignment: 'center',
                          fit: [110, 110],
                        },
                        {
                          text: `รายละเอียดเพิ่มเติม: ${option.check_comment}`,
                          margin: [0, 22.5, 0, 0],
                          border: [true, false, false, false],
                        },
                      ],
                    ],
                  },
                },
              ],
            };
          } else {
            return `${option.vhc_checklist_name}: ปกติ`;
          }
        });

        try {
          template.content.push(
            {
              text: '\n',
              fontSize: 5,
            },
            {
              ol: checkListWithImg,
              alignment: 'left',
              fontSize: 11,
              bold: false,
            },
            {
              text: '\n',
              fontSize: 5,
            },
          );
        } catch (error) {
          throw new Error('Checklist 13 Step with Img not found');
        }

        //การบันทึกรูปภาพ 6 step
        //หัวข้อ
        template.content.push(
          {
            text: '\n',
            fontSize: 10,
          },
          {
            text: 'การบันทึกรูปภาพ',
            alignment: 'left',
            fontSize: 12,
            bold: true,
          },
          {
            text: '\n',
            fontSize: 5,
          },
        );

        //ขั้นตอนที่ 1 ภายในเครื่อง
        try {
          template.content.push(
            {
              text: 'ขั้นตอนที่ 1 ภายในรถ',
              alignment: 'left',
              fontSize: 12,
              bold: false,
            },
            {
              text: '\n',
              fontSize: 5,
            },
            {
              stack: [
                {
                  table: {
                    widths: ['50%', '50%'],
                    heights: function (row) {
                      if (row === 0) {
                        return 45;
                      }
                      return 'auto';
                    },
                    body: [
                      [
                        {
                          image: srcPath + vhcImg.path_mainpicture_1,
                          alignment: 'center',
                          fit: [110, 110],
                        },
                      ],
                    ],
                  },
                },
                {
                  text: '\n',
                  fontSize: 5,
                },
                {
                  table: {
                    widths: ['50%', '50%'],
                    heights: function (row) {
                      if (row === 0) {
                        return 45;
                      }
                      return 'auto';
                    },
                    body: [
                      [
                        {
                          image: srcPath + vhcImg.path_mainpicture_2,
                          alignment: 'center',
                          fit: [110, 110],
                        },
                      ],
                    ],
                  },
                },
                {
                  text: '\n',
                  fontSize: 5,
                },
                {
                  table: {
                    widths: ['50%', '50%'],
                    heights: function (row) {
                      if (row === 0) {
                        return 45;
                      }
                      return 'auto';
                    },
                    body: [
                      [
                        {
                          image: srcPath + vhcImg.path_mainpicture_3,
                          alignment: 'center',
                          fit: [110, 110],
                        },
                      ],
                    ],
                  },
                },
                {
                  text: '\n',
                  fontSize: 10,
                },
              ],
            },
          );
        } catch (error) {
          throw new Error('Image Step 1 not found');
        }

        //ขั้นตอนที่ 2 ด้านหน้ารถ
        try {
          template.content.push(
            {
              text: '\n',
              fontSize: 5,
            },
            {
              text: 'ขั้นตอนที่ 2 ด้านหน้ารถ',
              alignment: 'left',
              fontSize: 12,
              bold: false,
            },
            {
              text: '\n',
              fontSize: 5,
            },
            {
              stack: [
                {
                  table: {
                    widths: ['50%', '50%'],
                    heights: function (row) {
                      if (row === 0) {
                        return 45;
                      }
                      return 'auto';
                    },
                    body: [
                      [
                        {
                          image: srcPath + vhcImg.path_mainpicture_4,
                          alignment: 'center',
                          fit: [110, 110],
                        },
                      ],
                    ],
                  },
                },
                {
                  text: '\n',
                  fontSize: 10,
                },
              ],
            },
          );
        } catch (error) {
          throw new Error('Image step 2 not found');
        }

        //ขั้นตอนที่ 3 มุมซ้ายของรถ
        try {
          template.content.push(
            {
              text: 'ขั้นตอนที่ 3 มุมซ้ายของรถ',
              alignment: 'left',
              fontSize: 12,
              bold: false,
            },
            {
              text: '\n',
              fontSize: 5,
            },
            {
              stack: [
                {
                  table: {
                    widths: ['50%', '50%'],
                    heights: function (row) {
                      if (row === 0) {
                        return 45;
                      }
                      return 'auto';
                    },
                    body: [
                      [
                        {
                          image: srcPath + vhcImg.path_mainpicture_5,
                          alignment: 'center',
                          fit: [110, 110],
                        },
                      ],
                    ],
                  },
                },
                {
                  text: '\n',
                  fontSize: 10,
                },
              ],
            },
          );
        } catch (error) {
          throw new Error('Image step 3 not found');
        }

        //ขั้นตอนที่ 4 หลังรถ
        try {
          template.content.push(
            {
              text: 'ขั้นตอนที่ 4 หลังรถ',
              alignment: 'left',
              fontSize: 12,
              bold: false,
            },
            {
              text: '\n',
              fontSize: 5,
            },
            {
              stack: [
                {
                  table: {
                    widths: ['50%', '50%'],
                    heights: function (row) {
                      if (row === 0) {
                        return 45;
                      }
                      return 'auto';
                    },
                    body: [
                      [
                        {
                          image: srcPath + vhcImg.path_mainpicture_6,
                          alignment: 'center',
                          fit: [110, 110],
                        },
                      ],
                    ],
                  },
                },
                {
                  text: '\n',
                  fontSize: 10,
                },
              ],
            },
          );
        } catch (error) {
          throw new Error('Image step 4 not found');
        }

        //ขั้นตอนที่ 5 มุมขวาของรถ
        try {
          template.content.push(
            {
              text: 'ขั้นตอนที่ 5 มุมขวาของรถ',
              alignment: 'left',
              fontSize: 12,
              bold: false,
            },
            {
              text: '\n',
              fontSize: 5,
            },
            {
              stack: [
                {
                  table: {
                    widths: ['50%', '50%'],
                    heights: function (row) {
                      if (row === 0) {
                        return 45;
                      }
                      return 'auto';
                    },
                    body: [
                      [
                        {
                          image: srcPath + vhcImg.path_mainpicture_7,
                          alignment: 'center',
                          fit: [110, 110],
                        },
                      ],
                    ],
                  },
                },
                {
                  text: '\n',
                  fontSize: 10,
                },
              ],
            },
          );
        } catch (error) {
          throw new Error('Image step 5 not found');
        }

        //ขั้นตอนที่ 6 ตัวเครื่องรถ
        try {
          template.content.push(
            {
              text: 'ขั้นตอนที่ 6 ตัวเครื่องรถ',
              alignment: 'left',
              fontSize: 12,
              bold: false,
            },
            {
              text: '\n',
              fontSize: 5,
            },
            {
              stack: [
                {
                  table: {
                    widths: ['50%', '50%'],
                    heights: function (row) {
                      if (row === 0) {
                        return 45;
                      }
                      return 'auto';
                    },
                    body: [
                      [
                        {
                          image: srcPath + vhcImg.path_mainpicture_8,
                          alignment: 'center',
                          fit: [110, 110],
                        },
                      ],
                    ],
                  },
                },
                {
                  text: '\n',
                  fontSize: 10,
                },
              ],
            },
          );
        } catch (error) {
          throw new Error('Image step 6 not found');
        }

        // ตั้งค่า ค่าเริ่มต้น
        template.defaultStyle = {
          font: 'THSarabunNew',
          fontSize: 12,
          bold: false,
        };

        // ตั้งค่า รูปแบบ
        template.styles = {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'justify',
          },
          subHeader: {
            fontSize: 12,
            bold: false,
            alignment: 'justify',
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          tableHeaderList: {
            bold: true,
            fontSize: 12,
            color: 'black',
          },
        };

        const filename = `VHC-${VhcMaster.id}.pdf`;
        //create name in local
        await this.generatePdf(template, filename);
        // console.log('this is filename: ' + filename);
        // console.log('this is path:' + path);

        // uploade minio
        await this.minioService.putData(filename);
        console.log('uploade pdf to minio');

        const pdfFilename = [filename];
        const message = 'Download PDF success';

        resolve({ message, pdfFilename });
      } catch (error) {
        console.log(error);
        const errorMessage = 'PDF download error';
        resolve({ errorMessage });
        // throw new Error(errorMessage);
      }
    });
  }

  async Test() {
    console.log('Testing');
    const buckets = await this.minioService.testMinioClient();
    console.log(buckets);
  }
}
