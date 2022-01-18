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
  getdatawithSmallQuality(): Observable<HistoricData[]> {
    const url = HISTORICDATA_URL + '/small';
    return this.http.get<HistoricData[]>(url);
  }
  getdatawithMediumQuality(): Observable<HistoricData[]> {
    const url = HISTORICDATA_URL + '/medium';
    return this.http.get<HistoricData[]>(url);
  }
  getdatawithLargeQuality(): Observable<HistoricData[]> {
    const url = HISTORICDATA_URL + '/large';
    return this.http.get<HistoricData[]>(url);
  }
}
