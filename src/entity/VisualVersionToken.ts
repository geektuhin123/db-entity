/**
 * Visual Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import User from './User';
import Visual from './Visual';

/**
 * Visual Table
 * @extends BaseTable
 */
@Entity({ name: 'visual_version_token' })
class VisualVersionToken extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  accessToken: number;

  @Column()
  visualId: string;

  @ManyToOne(() => Visual, (visual) => visual.visualVersionToken)
  @JoinColumn()
  visual: Visual;

  @ManyToOne(() => User, (user) => user.versionToken)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  static skipTenant = true;
}
export default VisualVersionToken;
