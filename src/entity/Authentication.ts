/**
 * Authentication Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';
import UserAuthentication from './UserAuthentication';
import { USER_AUTHENTICATION_TYPE } from '../constants/common';
import { decrypt } from '../utilities/cipher';

/**
 * Authentication Table
 * @extends BaseTable
 */
@Entity()
class Authentication extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  settings: string;

  @OneToMany(() => UserAuthentication, (userAuthentication) => userAuthentication.authentication)
  userAuthentications: UserAuthentication[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    if (this.id !== USER_AUTHENTICATION_TYPE.NATIVE) {
      this.settings = JSON.parse(decrypt(this.settings, this.updatedAt.toString()));
    }
  }

  static skipTenant = true;
}

export default Authentication;
