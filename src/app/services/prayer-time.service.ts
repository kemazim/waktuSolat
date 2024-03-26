import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { PrayerTimes } from 'src/app/model/prayerTimes';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimeService {
  private url: string = "http://mpt.i906.my/mpt.json?";
  private urlJakim: string = "https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat";

  constructor(private http: HttpClient) { }

  getDailyPrayer(cityCode: string, filter: number) {
    return this.http.get<any>(`${this.url}code=${cityCode}&filter=${filter}`);
  }

  getPrayerTimesDuration(period: string, filter: string) {
    return this.http.get<any>(`${this.urlJakim}&period=${period}&zone=${filter}`);
  }

  getPrayerTimes(dateStart: string, dateEnd: string, zone: string) {
    const body = {
      period: JSON.stringify({ datestart: dateStart, dateend: dateEnd }),
      zone: zone
    };

    // Specify your headers if necessary, for example, Content-Type
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    // Now make the POST request
    return this.http.post(this.urlJakim, body, httpOptions);
  }
}
