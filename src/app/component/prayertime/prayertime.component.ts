import { DatePipe } from '@angular/common';
import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PrayerTimeService } from 'src/app/services/prayer-time.service';

@Component({
  selector: 'app-prayertime',
  templateUrl: './prayertime.component.html',
  styleUrls: ['./prayertime.component.css']
})
export class PrayertimeComponent implements OnInit {
  code: string = '';
  filter: number = 0;
  prayerTimes: any[] = [];
  eachPrayerTime: any[] = [];
  today = new Date();
  todayDate: any;
  time = new Date();
  intervalId: any;
  prayerTimeDisplay!: boolean;
  prayerCountdown: any;

  constructor(
    private prayerService: PrayerTimeService
    ) { }

  ngOnInit(): void {
    this.code = 'sgr-6';
    this.filter = 1;

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // this.prayerService.getPrayerTimesDuration("day","sgr01").subscribe(res => {
    //   console.log(res);
    // })
    this.prayerService.getPrayerTimes('2023-06-01', '2023-06-01', 'MLK01').subscribe(result => {
      console.log(result)
    });


    this.prayerService.getDailyPrayer(this.code, this.filter).subscribe(result => {
      console.log(result)
      this.prayerTimes = result.response.times;
      const prayerNames = ['Subuh', 'Syuruk', 'Zuhur', 'Asar', 'Maghrib', 'Isyak'];

      this.prayerTimes = this.prayerTimes.map((timestamp, index) => {
        const prayerName = prayerNames[index];
        const formattedTime = this.convertUnixTimestampToTime(timestamp);
        return { name: prayerName, time: formattedTime };
      });
      this.startCountdown();
    });
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.prayerTimes.forEach(prayerTime => {
        prayerTime.countdown = this.calculateCountdown(prayerTime.time.date);
      });
    }, 1000);

    const firstMatch = this.prayerTimes.find(result=> result.time.date > this.time);

    if (firstMatch) {
      this.prayerCountdown = firstMatch;
    }
  }

  calculateCountdown(prayerTime: Date): string {
    const currentTime = new Date();
    const timeDifference = prayerTime.getTime() - currentTime.getTime();
    const isCountdownPassed = timeDifference <= 0;

    if (isCountdownPassed) {
      return 'Prayer time passed';
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  

  convertUnixTimestampToTime(unixTimestamp: number): { date: Date, hours: number, minutes: string } {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return { date, hours, minutes };
  }
}