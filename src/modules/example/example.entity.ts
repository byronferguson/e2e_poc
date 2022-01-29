import { differenceInMonths, differenceInYears, parseISO } from 'date-fns';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum GenderPreference {
  ANY = 'Any',
  MALE = 'Male',
  FEMALE = 'Female',
}

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  firstName: string;

  @Column({
    length: 100,
  })
  lastName: string;

  protected fullName: string;
  protected partialFullName: string;
  @AfterLoad()
  private setNames() {
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.partialFullName = `${this.firstName} ${this.lastName.charAt(0)}.`;
  }

  @Column({
    type: 'date',
  })
  birthdate: string;

  protected age: number;
  @AfterLoad()
  private setAge() {
    const now = Date.now();
    const birthdate = parseISO(this.birthdate);
    const ageInYears = differenceInYears(now, birthdate);

    this.age = Boolean(ageInYears) ? ageInYears : differenceInMonths(now, birthdate) / 12;
  }

  @Column({
    type: 'enum',
    enum: GenderPreference,
    default: GenderPreference.ANY,
  })
  genderPreference: GenderPreference;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
