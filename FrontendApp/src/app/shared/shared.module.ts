import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule, GoogleChartsModule],
  exports: [ChartComponent],
})
export class SharedModule {}
