import { NgModule } from '@angular/core';
import { BenchmarkComponent } from './benchmark.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostHistoricDataComponent } from './components/postHistoricData/postHistoricData.component';

@NgModule({
  imports: [SharedModule],
  declarations: [BenchmarkComponent, PostHistoricDataComponent],
})
export class BenchmarkModule {}
