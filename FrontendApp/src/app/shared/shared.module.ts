import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatToolbarModule, RouterModule, GoogleChartsModule],
  declarations: [NavigationComponent, ChartComponent],
  exports: [MatToolbarModule, NavigationComponent, ChartComponent],
})
export class SharedModule {}
