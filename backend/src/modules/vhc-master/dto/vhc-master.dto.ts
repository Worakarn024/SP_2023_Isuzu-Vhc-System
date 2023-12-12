/* eslint-disable prettier/prettier */
export interface VhcMasterDto {
  id: number;
  vhc_date: Date;
  vhc_time: string;
  ahistory_id: number;
  amodel_id: number;
  model_name: string;
  mile_in: number;
  running_queue: string;
  vhc_model_id: number;
  cus_id: number;
  engin_id: string;
  chassis: string;
  comment: string;
  time_delivery: string;
  start_time_vhc: string;
  end_time_vhc: string;
  clocking_time_vhc: string;
  is_body_damage: number;
  PDF_file: string;
  record_status: number;
  create_by: string;
  update_by: string;
  create_date: string;
  update_date: string;
  branch_id: number;
  cvhc_main_id: number;
  customer_signature: string;
  sa_vhc_signature: string;
  customer_recieve_signature: string;
  sa_delivery_signature: string;
  radio_pole: number;
  hbg_sticker: number;
  hbg_sticker_current: number;
  blame_rainy: number;
  blame_dust: number;
  blame_drop: number;
  cus_type: number;
  is_complete: number;
  path_customer_signature: string;
  path_sa_signature: string;
}