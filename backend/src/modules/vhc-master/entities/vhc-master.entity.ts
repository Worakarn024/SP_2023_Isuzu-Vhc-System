import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vhc_master')
export class VhcMasterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  vhc_date: Date;

  @Column({ type: 'time' })
  vhc_time: string;

  @Column({ type: 'int' })
  ahistory_id: number;

  @Column({ type: 'int' })
  amodel_id: number;

  @Column({ type: 'varchar' })
  model_name: string;

  @Column({ type: 'int' })
  mile_in: number;

  @Column({ type: 'varchar' })
  running_queue: string;

  @Column({ type: 'int' })
  vhc_model_id: number;

  @Column({ type: 'int' })
  cus_id: number;

  @Column({ type: 'varchar' })
  engin_id: string;

  @Column({ type: 'varchar' })
  chassis: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'datetime' })
  time_delivery: string;

  @Column({ type: 'datetime' })
  start_time_vhc: string;

  @Column({ type: 'datetime' })
  end_time_vhc: string;

  @Column({ type: 'time' })
  clocking_time_vhc: string;

  @Column({ type: 'tinyint' })
  is_body_damage: number;

  @Column({ type: 'longtext' })
  PDF_file: string;

  @Column({ type: 'int' })
  record_status: number;

  @Column({ type: 'varchar' })
  create_by: string;

  @Column({ type: 'varchar' })
  update_by: string;

  @Column({ type: 'datetime' })
  create_date: string;

  @Column({ type: 'datetime' })
  update_date: string;

  @Column({ type: 'int' })
  branch_id: number;

  @Column({ type: 'int' })
  cvhc_main_id: number;

  @Column({ type: 'longtext' })
  customer_signature: string;

  @Column({ type: 'longtext' })
  sa_vhc_signature: string;

  @Column({ type: 'longtext' })
  customer_recieve_signature: string;

  @Column({ type: 'longtext' })
  sa_delivery_signature: string;

  @Column({ type: 'tinyint' })
  radio_pole: number;

  @Column({ type: 'tinyint' })
  hbg_sticker: number;

  @Column({ type: 'tinyint' })
  hbg_sticker_current: number;

  @Column({ type: 'tinyint' })
  blame_rainy: number;

  @Column({ type: 'tinyint' })
  blame_dust: number;

  @Column({ type: 'tinyint' })
  blame_drop: number;

  @Column({ type: 'tinyint' })
  cus_type: number;

  @Column({ type: 'tinyint' })
  is_complete: number;

  @Column({ type: 'varchar' })
  path_customer_signature: string;

  @Column({ type: 'varchar' })
  path_sa_signature: string;
}
