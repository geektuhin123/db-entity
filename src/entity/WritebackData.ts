/**
 * WritebackData Table
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import BaseTable from './BaseTable';

/**
 * WritebackData Table
 * @extends BaseTable
 */
@Entity({ name: 'writeback_data' })
class WritebackData extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  seriesVersion: string;

  @Column('text')
  series: string;

  @Column('text')
  seriesType: string;

  @Column()
  visualId: string;

  @Column()
  destinationId: number;

  @Column('text')
  data: string;

  @Column()
  sourceTableName: string;

  @Column()
  seriesIdentifier: string;

  @Column('text')
  metaData: string;

  static skipTenant = true;
}

export default WritebackData;
