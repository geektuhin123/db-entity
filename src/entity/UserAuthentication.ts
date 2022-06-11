/**
 * UserAuthentication Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';
import User from './User';
import Authentication from './Authentication';
import { decrypt } from '../utilities/cipher';

/**
 * UserAuthentication Table
 * @extends BaseTable
 */
@Entity({ name: 'user_authentication' })
class UserAuthentication extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('text')
  authToken: string;

  @Column('text')
  refreshToken: string;

  @Column('text')
  graphAccessToken: string;

  @Column('text')
  graphRefreshToken: string;

  @Column()
  userId: string;

  @Column()
  authenticationId: string;

  @Column({ nullable: true })
  resetToken: string;

  @ManyToOne(() => User, (user) => user.userAuthentications)
  user: User;

  @ManyToOne(() => Authentication, (authentication) => authentication.userAuthentications)
  authentication: Authentication;

  /**
   * Function hook that executes after loading the data into the object
   * Will decrypt the accessTokens
   */
  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  decryptTokens() {
    this.authToken =
      this.authToken && this.authToken !== ''
        ? decrypt(this.authToken, this.createdAt.toString())
        : this.authToken;

    this.refreshToken =
      this.refreshToken && this.refreshToken !== ''
        ? decrypt(this.refreshToken, this.createdAt.toString())
        : this.refreshToken;

    this.graphAccessToken =
      this.graphAccessToken && this.graphAccessToken !== ''
        ? decrypt(this.graphAccessToken, this.createdAt.toString())
        : this.graphAccessToken;

    this.graphRefreshToken =
      this.graphRefreshToken && this.graphRefreshToken !== ''
        ? decrypt(this.graphRefreshToken, this.createdAt.toString())
        : this.graphRefreshToken;
  }

  static skipTenant = true;
}

export default UserAuthentication;
