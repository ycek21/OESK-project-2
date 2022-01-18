import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PexelsResponse } from '../models/pexels-response';
import { UnsplashResponse } from '../models/unsplash-response';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private pexelsUrl: string =
    'https://api.pexels.com/v1/search?query=animal&per_page=:PER_PAGE:&page=:PAGE_NUMBER:&size=large';

  private pexelsKey: string =
    '563492ad6f917000010000013fb66d388f504027b230b7f44b263be2';

  private unsplashUrl: string =
    'https://api.unsplash.com/photos/random/?client_id=wo1w-k_a3rEHLCP9d009H1WbU7R6_YR7klllQqDD79M&query=animal&count=:PER_PAGE:';

  private fullHdQuery = '?&h=1080&w=1920&fit=crop';
  private fourKQuery = '?&h=2160&w=3840&fit=crop';

  constructor(private http: HttpClient) {}

  public getPexelsPhotos(
    quantityNumber: number,
    pageNumber: number
  ): Observable<PexelsResponse> {
    const quantity = quantityNumber.toString();

    let url = this.pexelsUrl
      .replace(':PER_PAGE:', quantity)
      .replace(':PAGE_NUMBER:', pageNumber.toString());

    const header = {
      headers: new HttpHeaders().set('Authorization', this.pexelsKey),
    };

    return this.http.get<PexelsResponse>(url, header);
  }

  public getPhoto(url: string, size: string) {
    if (size === '1080p') {
      url += this.fullHdQuery;
    } else if (size === '4k') {
      url += this.fourKQuery;
    }

    return this.http.get(url, { responseType: 'blob' });
  }

  public getUnsplashPhotos(quantity: number): Observable<UnsplashResponse[]> {
    const url = this.unsplashUrl.replace(':PER_PAGE:', quantity.toString());
    return this.http.get<UnsplashResponse[]>(url);
  }
}
