import { Component, Input, OnInit } from '@angular/core';
// import { ChartType } from 'angular-google-charts';
import { HistoricData } from 'src/app/modules/historic-data/models/historicData';
import { ChartType, ChartOptions, Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() data: [HistoricData[], HistoricData[], HistoricData[]] = [
    [],
    [],
    [],
  ];

  chart: any = [];

  constructor() {}

  ngOnInit() {
    // let mapedData = this.data.map(function (x) {
    //   return { x: x.numberOfPhotos, y: x.time };
    // });
    // let mapedData2 = this.data.map(function (x) {
    //   return { x: x.numberOfPhotos + 1, y: x.time + 1 };
    // });
  }
  prepareData(data: HistoricData[]) {
    const pexels = data.filter((x) => x.apiType === 'Pexels');
    const unsplash = data.filter((x) => x.apiType === 'Unsplash');
    let mapPexels = this.mapDataToScatterChart(pexels);
    let mapUnsplash = this.mapDataToScatterChart(unsplash);
    return [mapPexels, mapUnsplash];
  }
  mapDataToScatterChart(filteredData: HistoricData[]) {
    return filteredData.map(function (x) {
      return { x: x.numberOfPhotos, y: x.time };
    });
  }
  createChartWithSmallQuality() {
    const preparedData = this.prepareData(this.data[0]);

    this.chart = new Chart('canvas', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Pexels',
            data: preparedData[0],
            backgroundColor: 'rgb(147, 250, 165)',
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: 'Unsplash',
            data: preparedData[1],
            backgroundColor: 'rgba(0,10,220,0.5)',
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
          text: 'Small quality of photos',
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
