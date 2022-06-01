import {
  Ctx,
  Hears,
  Help,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { Coordinates, PrayerTimes, CalculationMethod } from 'adhan';
import * as moment from 'moment-timezone';
import { find } from 'geo-tz';

@Update()
export class PrayScheduleService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Hears('hi')
  @Hears('Hi')
  @Hears('Hey')
  @Hears('Hello')
  async introduce(): Promise<string> {
    return `السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\nAssalamualaikum Warahmatullahi Wabarakatuh\n\nAku adalah bot yang bisa memberikan jadwal shalat di lokasi kamu.\nAku dibuat oleh @whysetiawan.\nCukup kirimkan lokasi kamu.`;
  }

  @Start()
  async onStart(): Promise<string> {
    return this.introduce();
  }

  @On('location')
  async onLocation(
    @Message('location') msg: { longitude: number; latitude: number },
    @Ctx() ctx: Context,
  ): Promise<any> {
    const now = new Date();
    const coords = new Coordinates(msg.latitude, msg.longitude);
    const params = CalculationMethod.MoonsightingCommittee();
    const prayerTimes = new PrayerTimes(coords, now, params);
    const timeZone = find(msg.latitude, msg.longitude);

    await ctx.reply(
      `<b>Berikut Jadwal Shalat Hari ini di lokasi kamu</b>\n<i><b>Subuh:</b></i> ${moment
        .utc(prayerTimes.fajr)
        .tz(timeZone[0])
        .format('HH:mm')}\n<i><b>Dzuhur:</b></i> ${moment
        .utc(prayerTimes.dhuhr)
        .tz(timeZone[0])
        .format('HH:mm')}\n<i><b>Ashar:</b></i> ${moment
        .utc(prayerTimes.asr)
        .tz(timeZone[0])
        .format('HH:mm')}\n<i><b>Maghrib:</b></i> ${moment
        .utc(prayerTimes.maghrib)
        .tz(timeZone[0])
        .format('HH:mm')}\n<i><b>Isya:</b></i> ${moment
        .utc(prayerTimes.isha)
        .tz(timeZone[0])
        .format('HH:mm')}
    `,
      {
        parse_mode: 'HTML',
      },
    );
    // context.
    // const location = await this.bot.telegram.
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }
}
