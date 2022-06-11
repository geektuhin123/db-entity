/**
 * WritebackJobEvent Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import Writeback from './Writeback';

/**
 * WritebackJobEvent Table
 * @extends BaseTable
 */
@Entity({ name: 'writeback_job_event' })
class WritebackJobEvent extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  writebackId: string;

  @Column()
  eventCode: string;

  @Column()
  eventValue: string;

  @ManyToOne(() => Writeback, (writeback) => writeback.writebackJobEvents)
  @JoinColumn()
  writeback: Writeback;
}

export default WritebackJobEvent;
