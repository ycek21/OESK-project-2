import { ChartComponent } from './components/chart/chart.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PageComponent } from './page/page.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: [PageComponent, ChartComponent],
  providers: [DatePipe],
})
export class HistoricDataModule {}
