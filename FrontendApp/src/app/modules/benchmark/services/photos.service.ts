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
    'https://api.pexels.com/v1/search?query=nature&per_page=:PER_PAGE:&page=1&size=:SIZE:';

  private pexelsKey: string =
    '563492ad6f917000010000013fb66d388f504027b230b7f44b263be2';

  // private unsplashUrl: string =
  //   'https://api.unsplash.com/photos/?client_id=wo1w-k_a3rEHLCP9d009H1WbU7R6_YR7klllQqDD79M&w=:WIDTH:&h=:HEIGHT:&page=1&per_page=:PER_PAGE:';

  private unsplashUrl: string =
    'https://api.unsplash.com/photos/random/?client_id=wo1w-k_a3rEHLCP9d009H1WbU7R6_YR7klllQqDD79M&query=animal&count=:PER_PAGE:';
  constructor(private http: HttpClient) {}

  public getPexelsPhotos(
    size: string,
    quantityNumber: number
  ): Observable<PexelsResponse> {
    const quantity = quantityNumber.toString();

    let url = this.pexelsUrl
      .replace(':PER_PAGE:', quantity)
      .replace(':SIZE:', size);

    const header = {
      headers: new HttpHeaders().set('Authorization', this.pexelsKey),
    };

    return this.http.get<PexelsResponse>(url, header);
  }

  public getPhoto(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }

  public getUnsplashPhotos(
    width: number,
    height: number,
    quantity: number
  ): Observable<UnsplashResponse[]> {
    const url = this.unsplashUrl
      .replace(':WIDTH:', width.toString())
      .replace(':HEIGHT:', height.toString())
      .replace(':PER_PAGE:', quantity.toString());
    return this.http.get<UnsplashResponse[]>(url);
  }
}
