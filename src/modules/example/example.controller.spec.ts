import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

const MockExampleService = () => ({});

describe('Example Controller', () => {
  let controller: ExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ExampleService,
          useFactory: MockExampleService,
        },
      ],
      controllers: [ExampleController],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
