import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HistoricData } from 'src/app/modules/historic-data/models/historicData';

@Component({
  selector: 'app-shared-chart',
  templateUrl: './shared-chart.component.html',
  styleUrls: ['./shared-chart.component.scss'],
})
export class SharedChartComponent implements OnInit, OnChanges {
  @Input() dataForChart: HistoricData[] = [];
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('this.dataForChart :>> ', this.dataForChart);
  }
}
