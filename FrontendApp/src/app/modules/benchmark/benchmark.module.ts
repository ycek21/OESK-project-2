import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchmarkComponent } from './benchmark.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [BenchmarkComponent],
})
export class BenchmarkModule {}
