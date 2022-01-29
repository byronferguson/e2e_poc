import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Roles } from '../../guards/auth/roles.decorator';
import { CreateStudentDto } from './dtos/example.dto';
import { StudentEntity } from './example.entity';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  findAll(): Promise<StudentEntity[]> {
    return this.exampleService.findAll();
  }

  @Roles('auth')
  @Get(':studentId')
  @ApiOkResponse({ description: 'Student Found' })
  @ApiNotFoundResponse({ description: 'Student Not Found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findByPk(@Param('studentId') studentId: number): Promise<StudentEntity> {
    return this.exampleService.findByPK(studentId);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Student Created' })
  public async createStudent(@Body() student: CreateStudentDto): Promise<StudentEntity> {
    return this.exampleService.create(student);
  }

  @Put()
  public async updateStudent(@Body() student: Partial<StudentEntity>) {
    return this.exampleService.update(student);
  }
}
