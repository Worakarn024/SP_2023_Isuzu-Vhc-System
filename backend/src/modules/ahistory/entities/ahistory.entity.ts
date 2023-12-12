import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ahistory')
export class AhistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  abrand_id: string;

  @Column({ type: 'varchar' })
  amodel_id: string;

  @Column({ type: 'varchar' })
  model_name: string;

  @Column({ type: 'varchar' })
  register: string;

  @Column({ type: 'varchar' })
  register_province: string;

  @Column({ type: 'varchar' })
  chassis: string;

  @Column({ type: 'varchar' })
  full_chassis: string;

  @Column({ type: 'varchar' })
  engin_id: string;

  @Column({ type: 'varchar' })
  full_engine: string;
}
