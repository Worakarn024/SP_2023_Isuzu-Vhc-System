export interface PreVhcEntity {
  branchId: number;
  //   custNo: number;
  engineNumber: number;
  chassis: number;
  licensePlate: string;
  fullModelName: string;
  preVhcDate: number;
  mileIn: number;
  details: string;
  driverFullname: string;
  driverTelephone: number;

  isCheckBatteryDistilledWater: boolean;
  isCheckLightingAroundCar: boolean;
  isCheckTirePressure: boolean;
  isCarWash: boolean;

  preVhclist: number;
  totalPriceExCludeVat: string;
  totalPriceVat: string;
  totalPrice: string;
}
