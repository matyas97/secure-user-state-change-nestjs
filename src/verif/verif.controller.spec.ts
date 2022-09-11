import { Test, TestingModule } from '@nestjs/testing';
import { VerifController } from './verif.controller';
import { VerifService } from './verif.service';

describe('VerifController', () => {
  let controller: VerifController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifController],
      providers: [VerifService],
    }).compile();

    controller = module.get<VerifController>(VerifController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
