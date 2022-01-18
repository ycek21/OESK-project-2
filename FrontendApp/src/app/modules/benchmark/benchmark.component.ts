import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BenchmarkForm } from './models/benchmark-form';
import { PhotosService } from './services/photos.service';
import { delay, switchMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { UnsplashResponse } from './models/unsplash-response';

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.scss'],
})
export class BenchmarkComponent implements OnInit {
  minSizeOptions: { key: string; value: { x: number; y: number } }[] = [
    {
      key: 'small',
      value: { x: 1000, y: 4000 },
    },
    {
      key: 'medium',
      value: { x: 3000, y: 4000 },
    },
    {
      key: 'large',
      value: { x: 6000, y: 4000 },
    },
  ];

  photoQuantity: number[] = [1, 5, 15];

  form: FormGroup = this.fb.group({
    size: ['', Validators.required],
    quantity: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private photosService: PhotosService) {}

  ngOnInit() {}

  public saveForm(): void {
    const formValue = this.form.value;

    this.getPexelsPhotos(formValue);
    this.getUnsplashPhotos(formValue);
  }

  private getPexelsPhotos(formValue: BenchmarkForm): void {
    console.log('formValue :>> ', formValue);

    const photosQuality = formValue.size.key;
    const numberOfPhotosToDownload = formValue.quantity;
    const startTime = performance.now();

    this.photosService
      .getPexelsPhotos(photosQuality, numberOfPhotosToDownload)
      .pipe(
        switchMap((data) => {
          const photosListObs: Observable<Object>[] = [];

          console.log('data :>> ', data);

          data.photos.forEach((photo) => {
            photosListObs.push(this.photosService.getPhoto(photo.src.original));
          });

          return forkJoin(photosListObs);
        })
      )
      .subscribe((x) => {
        const endTime = performance.now();

        const time = endTime - startTime;
        console.log('time pexels :>> ', time);
      });
  }

  private getUnsplashPhotos(formValue: BenchmarkForm) {
    const startTime = performance.now();

    const photosQualityWidth = formValue.size.value.x;
    const photosQualityHeight = formValue.size.value.y;
    const numberOfPhotosToDownload = formValue.quantity;

    this.photosService
      .getUnsplashPhotos(
        photosQualityWidth,
        photosQualityHeight,
        numberOfPhotosToDownload
      )
      .pipe(
        switchMap((data: UnsplashResponse[]) => {
          const photosListObs: Observable<Object>[] = [];

          data.forEach((photo) => {
            const x = this.photosService.getPhoto(photo.urls.raw);
            photosListObs.push(x);
          });

          return forkJoin(photosListObs);
        })
      )
      .subscribe((x) => {
        console.log('x :>> ', x);
        const endTime = performance.now();

        const time = endTime - startTime;
        console.log('time unsplash :>> ', time);
      });
  }
}
