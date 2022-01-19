import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BenchmarkForm } from './models/benchmark-form';
import { PhotosService } from './services/photos.service';
import { delay, switchMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { UnsplashResponse } from './models/unsplash-response';
import { HistoricData } from '../historic-data/models/historicData';

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.scss'],
})
export class BenchmarkComponent implements OnInit {
  photoQuality: string[] = ['1080P', '4K', 'Raw'];
  photoQuantity: number[] = [2, 5, 20];

  form: FormGroup = this.fb.group({
    quality: ['', Validators.required],
    quantity: ['', Validators.required],
  });

  pexelsPageNumber = 1;
  historicData: HistoricData[] = [];

  constructor(private fb: FormBuilder, private photosService: PhotosService) {}

  ngOnInit() {}

  public saveForm(): void {
    const formValue = this.form.value;

    this.getUnsplashPhotos(formValue);
    this.getPexelsPhotos(formValue);
  }

  private getPexelsPhotos(formValue: BenchmarkForm): void {
    const photosQuality = formValue.quality;
    const numberOfPhotosToDownload = formValue.quantity;
    const startTime = performance.now();

    this.photosService
      .getPexelsPhotos(numberOfPhotosToDownload, this.pexelsPageNumber)
      .pipe(
        switchMap((data) => {
          const photosListObs: Observable<Object>[] = [];
          this.pexelsPageNumber += 1;

          data.photos.forEach((photo) => {
            photosListObs.push(
              this.photosService.getPhoto(photo.src.original, photosQuality)
            );
          });

          return forkJoin(photosListObs);
        })
      )
      .subscribe((x) => {
        const endTime = performance.now();
        const time = endTime - startTime;
        console.log('time x :>> ', time);

        const pexelsHistoricData: HistoricData = {
          numberOfPhotos: numberOfPhotosToDownload,
          quality: photosQuality,
          time: time / 1000,
          apiType: 'pexels',
          createdAt: new Date(Date.now()),
        };

        this.historicData = [...this.historicData, pexelsHistoricData];
        // console.log('historicData :>> ', this.historicData);
      });
  }

  private getUnsplashPhotos(formValue: BenchmarkForm) {
    const photosQuality = formValue.quality;
    const numberOfPhotosToDownload = formValue.quantity;
    const startTime = performance.now();

    this.photosService
      .getUnsplashPhotos(numberOfPhotosToDownload)
      .pipe(
        switchMap((data: UnsplashResponse[]) => {
          const photosListObs: Observable<Object>[] = [];

          data.forEach((photo) => {
            const x = this.photosService.getPhoto(
              photo.urls.raw,
              photosQuality
            );
            photosListObs.push(x);
          });

          return forkJoin(photosListObs);
        })
      )
      .subscribe((x) => {
        const endTime = performance.now();

        const time = endTime - startTime;
        console.log('time :>> ', time);

        const unsplashHistoricData: HistoricData = {
          numberOfPhotos: numberOfPhotosToDownload,
          quality: photosQuality,
          time: time / 1000,
          apiType: 'unsplash',
          createdAt: new Date(Date.now()),
        };
        this.historicData = [...this.historicData, unsplashHistoricData];
      });
  }

  public resetHistoricDataTable(event: boolean) {
    if (true) {
      this.historicData = [];
    }
  }
}
