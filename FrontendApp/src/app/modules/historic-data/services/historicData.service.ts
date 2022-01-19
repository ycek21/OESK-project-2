import { Observable } from 'rxjs';
import { HISTORICDATA_URL } from './../../../shared/consts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoricData } from '../models/historicData';

@Injectable({
  providedIn: 'root',
})
export class HistoricDataService {
  constructor(private http: HttpClient) {}

  getAllHistoricData(): Observable<HistoricData[]> {
    const url = HISTORICDATA_URL;
    return this.http.get<HistoricData[]>(url);
  }

  getDataForCertainQuality(quality: string): Observable<HistoricData[]> {
    let queryParam = '';

    if (quality === '1080p') {
      queryParam = 'small';
    } else if (quality === '4k') {
      queryParam = 'medium';
    } else if (quality === 'raw') {
      queryParam = 'large';
    }

    const url = HISTORICDATA_URL + `/${queryParam}`;

    return this.http.get<HistoricData[]>(url);
  }

  public postHistoricData(historicData: HistoricData) {
    const url = HISTORICDATA_URL;

    console.log('historicData :>> ', historicData);

    return this.http.post(url, historicData);
  }
}
