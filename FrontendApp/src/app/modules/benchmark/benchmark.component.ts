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
  photoQuality: string[] = ['1080p', '4k', 'raw'];
  photoQuantity: number[] = [2, 5, 20];

  form: FormGroup = this.fb.group({
    quality: ['', Validators.required],
    quantity: ['', Validators.required],
  });

  pexelsPageNumber = 1;

  constructor(private fb: FormBuilder, private photosService: PhotosService) {}

  ngOnInit() {}

  public saveForm(): void {
    const formValue = this.form.value;

    this.getPexelsPhotos(formValue);
    this.getUnsplashPhotos(formValue);
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
      });
  }

  private getUnsplashPhotos(formValue: BenchmarkForm) {
    const startTime = performance.now();

    const photosQuality = formValue.quality;
    const numberOfPhotosToDownload = formValue.quantity;

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
      });
  }
}
