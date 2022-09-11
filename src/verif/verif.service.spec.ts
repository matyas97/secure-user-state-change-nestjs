import { Test, TestingModule } from '@nestjs/testing';
import { VerifService } from './verif.service';

describe('VerifService', () => {
  let service: VerifService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifService],
    }).compile();

    service = module.get<VerifService>(VerifService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
