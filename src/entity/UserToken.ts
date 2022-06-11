/**
 * UserToken Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';

/**
 * User Token Table
 * @extends BaseTable
 */
@Entity({ name: 'user_token' })
class UserToken extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column('text')
  accessToken: string;

  @Column('text')
  refreshToken: string;

  @Column('text')
  userTokenMeta: string;

  @Column()
  nonce: string;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.userTokenMeta = this.userTokenMeta ? JSON.stringify(this.userTokenMeta) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.userTokenMeta = this.userTokenMeta ? JSON.parse(this.userTokenMeta) : {};
  }

  static skipTenant = true;
}

export default UserToken;
