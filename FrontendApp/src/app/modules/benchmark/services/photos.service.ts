import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { PexelsResponse } from '../models/pexels-response';
import { UnsplashResponse } from '../models/unsplash-response';
import {
  pexelsUrl,
  pexelsKey,
  unsplashUrl,
  fullHdQuery,
  fourKQuery,
} from '../../../shared/consts';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(private http: HttpClient) {}

  public getPexelsPhotos(
    quantityNumber: number,
    pageNumber: number
  ): Observable<PexelsResponse> {
    const quantity = quantityNumber.toString();

    let url = pexelsUrl
      .replace(':PER_PAGE:', quantity)
      .replace(':PAGE_NUMBER:', pageNumber.toString());

    const header = {
      headers: new HttpHeaders().set('Authorization', pexelsKey),
    };

    return this.http.get<PexelsResponse>(url, header);
  }

  public getPhoto(url: string, size: string) {
    if (size === '1080p') {
      url += fullHdQuery;
    } else if (size === '4k') {
      url += fourKQuery;
    }

    return this.http.get(url, { responseType: 'blob' });
  }

  public getUnsplashPhotos(quantity: number): Observable<UnsplashResponse[]> {
    const url = unsplashUrl.replace(':PER_PAGE:', quantity.toString());
    return this.http.get<UnsplashResponse[]>(url);
  }
}
