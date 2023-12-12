import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vhc_save_checklist')
export class VhcSaveChecklistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  vhc_master_id: number;

  @Column({ type: 'int' })
  vhc_checklist_id: number;

  @Column({ type: 'varchar' })
  vhc_checklist_name: string;

  @Column({ type: 'tinyint' })
  check_status: number;

  @Column({ type: 'text' })
  check_comment: string;

  @Column({ type: 'longtext' })
  check_image: string;

  @Column({ type: 'varchar' })
  image_content_type: string;

  @Column({ type: 'tinyint' })
  record_status: number;

  @Column({ type: 'varchar' })
  create_by: string;

  @Column({ type: 'varchar' })
  update_by: string;

  @Column({ type: 'datetime' })
  create_date: string;

  @Column({ type: 'datetime' })
  update_date: string;

  @Column({ type: 'varchar' })
  path_check_image: string;
}
