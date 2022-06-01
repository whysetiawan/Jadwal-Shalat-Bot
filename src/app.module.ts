import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { PrayScheduleModule } from 'src/pray-schedule/pray-schedule.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_TOKEN,
      include: [PrayScheduleModule],
    }),
    PrayScheduleModule,
  ],
})
export class AppModule {}
