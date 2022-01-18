import { Component, Input, OnInit } from '@angular/core';
// import { ChartType } from 'angular-google-charts';
import { Data } from 'src/app/modules/historic-data/models/dataModel';
import { ChartType, ChartOptions, Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() data: Data[] = [];
  dataAsArray: any = [];

  chart: any = [];

  constructor() {}

  ngOnInit() {
    // this.dataAsArray = this.data.map((x) => Array.from(Object.values(x)));
    // console.log(this.dataAsArray);
    let mapedData = this.data.map(function (x) {
      return { x: x.numberOfPhotos, y: x.time };
    });
    let mapedData2 = this.data.map(function (x) {
      return { x: x.numberOfPhotos + 1, y: x.time + 1 };
    });
    this.chart = new Chart('canvas', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Pexels',
            data: mapedData,
            backgroundColor: 'rgb(147, 250, 165)',
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: 'Unsplash',
            data: mapedData2,
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
