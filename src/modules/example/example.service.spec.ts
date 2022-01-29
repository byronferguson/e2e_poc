import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '~/entities/mock-repository';
import { StudentEntity } from './example.entity';
import { ExampleService } from './example.service';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        {
          provide: getRepositoryToken(StudentEntity),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
