import { Test, TestingModule } from '@nestjs/testing';
import { PrayScheduleService } from './pray-schedule.service';

describe('PrayScheduleService', () => {
  let service: PrayScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrayScheduleService],
    }).compile();

    service = module.get<PrayScheduleService>(PrayScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
