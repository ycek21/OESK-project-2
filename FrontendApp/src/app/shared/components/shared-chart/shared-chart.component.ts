import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Chart from 'chart.js';
import { HistoricData } from 'src/app/modules/historic-data/models/historicData';

@Component({
  selector: 'app-shared-chart',
  templateUrl: './shared-chart.component.html',
  styleUrls: ['./shared-chart.component.scss'],
})
export class SharedChartComponent implements OnInit, OnChanges {
  @Input() dataForChart: HistoricData[] = [];
  chart: any = [];
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('this.dataForChart :>> ', this.dataForChart);
    this.createChart(this.dataForChart, 'canvas', 'Results');
  }
  seperateDate(data: HistoricData[]) {
    console.log(data);
    let newData = data.slice(1).slice(-2);
    let oldData = data.slice(0, -2);
    console.log(newData);
    console.log(oldData);
    return [oldData, newData];
  }
  prepareData(data: HistoricData[]) {
    const pexels = data.filter((x) => x.apiType === 'pexels');
    const unsplash = data.filter((x) => x.apiType === 'unsplash');
    let mapPexels = this.mapDataToScatterChart(pexels);
    let mapUnsplash = this.mapDataToScatterChart(unsplash);
    return [mapPexels, mapUnsplash];
  }
  mapDataToScatterChart(filteredData: HistoricData[]) {
    return filteredData.map(function (x) {
      return { x: x.numberOfPhotos, y: x.time };
    });
  }
  createChart(data: HistoricData[], chartId: string, title: string) {
    const seperatedData = this.seperateDate(data);
    const preparedDataOld = this.prepareData(seperatedData[0]);
    const preparedDataNew = this.prepareData(seperatedData[1]);

    return new Chart(chartId, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Pexels',
            data: preparedDataOld[0],
            backgroundColor: 'rgb(147, 250, 165)',
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: 'Unsplash',
            data: preparedDataOld[1],
            backgroundColor: 'rgba(0,10,220,0.5)',
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: 'Pexels latest',
            data: preparedDataNew[0],
            backgroundColor: 'rgb(12, 223, 216)',
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: 'Unsplash latest',
            data: preparedDataNew[1],
            backgroundColor: 'rgb(254, 255, 216)',
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: title,
          fontSize: 30,
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
            },
            {
              scaleLabel: {
                display: true,
                labelString: 'Number of photos',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Time [s]',
              },
            },
          ],
        },
      },
    });
  }
}
