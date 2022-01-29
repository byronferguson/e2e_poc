import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
  ) {}

  public async findAll(): Promise<StudentEntity[]> {
    return this.studentRepo.find();
  }

  public async findByPK(studentId: number): Promise<StudentEntity> {
    return this.studentRepo.findOne(studentId);
  }

  public async create(student: Partial<StudentEntity>) {
    return await this.studentRepo.save(student);
  }

  public async update(student: Partial<StudentEntity>) {
    return this.studentRepo.save(student);
  }
}
