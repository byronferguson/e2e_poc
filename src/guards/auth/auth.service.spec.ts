import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AUTH_SERVICE } from './constants';

const MockAuthServiceClient = () => ({});

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AUTH_SERVICE,
          useFactory: MockAuthServiceClient,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
