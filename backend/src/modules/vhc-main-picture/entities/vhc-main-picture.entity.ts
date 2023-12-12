import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vhc_mainpicture')
export class VhcMainPictureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  vhc_master_id: number;

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

  @Column({ type: 'longtext' })
  mainpicture_picture1: string;

  @Column({ type: 'longtext' })
  mainpicture_picture2: string;

  @Column({ type: 'longtext' })
  mainpicture_picture3: string;

  @Column({ type: 'longtext' })
  mainpicture_picture4: string;

  @Column({ type: 'longtext' })
  mainpicture_picture5: string;

  @Column({ type: 'longtext' })
  mainpicture_picture6: string;

  @Column({ type: 'longtext' })
  mainpicture_picture7: string;

  @Column({ type: 'longtext' })
  mainpicture_picture8: string;

  @Column({ type: 'varchar' })
  path_mainpicture_1: string;

  @Column({ type: 'varchar' })
  path_mainpicture_2: string;

  @Column({ type: 'varchar' })
  path_mainpicture_3: string;

  @Column({ type: 'varchar' })
  path_mainpicture_4: string;

  @Column({ type: 'varchar' })
  path_mainpicture_5: string;

  @Column({ type: 'varchar' })
  path_mainpicture_6: string;

  @Column({ type: 'varchar' })
  path_mainpicture_7: string;

  @Column({ type: 'varchar' })
  path_mainpicture_8: string;
}
