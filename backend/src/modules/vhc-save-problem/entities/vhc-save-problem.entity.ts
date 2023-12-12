import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vhc_save_problem')
export class VhcSaveProblemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  vhc_save_step_id: number;

  @Column({ type: 'int' })
  vhc_master_id: number;

  @Column({ type: 'tinyint' })
  step_id: number;

  @Column({ type: 'longtext' })
  problem_image: string;

  @Column({ type: 'varchar' })
  image_content_type: string;

  @Column({ type: 'text' })
  problem_comment: string;

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
  path_problem_image: string;
}
