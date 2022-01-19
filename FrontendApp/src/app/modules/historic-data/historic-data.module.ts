import { ChartComponent } from './components/chart/chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: [PageComponent, ChartComponent],
})
export class HistoricDataModule {}
