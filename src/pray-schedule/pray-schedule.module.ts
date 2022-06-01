import { Module } from '@nestjs/common';
import { PrayScheduleService } from 'src/pray-schedule/pray-schedule.service';

@Module({
  providers: [PrayScheduleService],
})
export class PrayScheduleModule {}
