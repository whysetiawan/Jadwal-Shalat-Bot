import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { PrayScheduleModule } from 'src/pray-schedule/pray-schedule.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '5471483054:AAF_KsBW49tFYa-TJ82NyRTB9ktgf4AWj0A',
      include: [PrayScheduleModule],
    }),
    PrayScheduleModule,
  ],
})
export class AppModule {}
