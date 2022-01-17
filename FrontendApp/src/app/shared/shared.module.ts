import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [CommonModule, MatToolbarModule, RouterModule, ChartsModule],
  declarations: [NavigationComponent, ChartComponent],
  exports: [MatToolbarModule, NavigationComponent, ChartComponent],
})
export class SharedModule {}
