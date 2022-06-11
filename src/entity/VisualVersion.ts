/**
 * VisualVersion Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { decrypt } from '../utilities/cipher';
import BaseTable from './BaseTable';
import User from './User';
import Visual from './Visual';

/**
 * Visual Table
 * @extends BaseTable
 */
@Entity({ name: 'visual_version' })
class VisualVersion extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  version: number;

  @Column()
  description: string;

  @Column('text')
  config: string;

  @Column('text')
  series: string;

  @Column()
  visualId: string;

  @ManyToOne(() => Visual, (visual) => visual.visualVersions)
  @JoinColumn()
  visual: Visual;

  @ManyToOne(() => User, (user) => user.versions)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.config = this.config ? JSON.parse(decrypt(this.config)) : {};
    this.series = this.series ? JSON.parse(decrypt(this.series)) : {};
  }

  static skipTenant = true;
}
export default VisualVersion;
