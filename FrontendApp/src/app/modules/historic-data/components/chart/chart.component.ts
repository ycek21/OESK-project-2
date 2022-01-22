import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
// import { ChartType } from 'angular-google-charts';
import { HistoricData } from 'src/app/modules/historic-data/models/historicData';
import { ChartType, ChartOptions, Chart } from 'chart.js';
import { HistoricDataService } from 'src/app/modules/historic-data/services/historicData.service';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

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

  chartSmall: any = [];
  chartMedium: any = [];
  chartLarge: any = [];

  constructor(
    private historicDataService: HistoricDataService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    let small = this.historicDataService.getDataForCertainQuality('1080p');
    let medium = this.historicDataService.getDataForCertainQuality('4k');
    let large = this.historicDataService.getDataForCertainQuality('raw');
    forkJoin([small, medium, large]).subscribe((results) => {
      this.data = results;
      this.chartSmall = this.createChart(this.data[0], 'canvas', '1080p');
      this.chartMedium = this.createChart(this.data[1], 'canvas2', '4K');
      this.chartLarge = this.createChart(this.data[2], 'canvas3', 'Raw');
    });
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
      return { x: x.numberOfPhotos, y: x.time, z: x.createdAt };
    });
  }
  createChart(data: HistoricData[], chartId: string, title: string) {
    const preparedData = this.prepareData(data);
    return new Chart(chartId, {
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
        tooltips: {
          callbacks: {
            afterBody: (t, d) => {
              let founded = data.find(
                (x) =>
                  x.numberOfPhotos === t[0].xLabel && x.time === t[0].yLabel
              );
              return (
                this.datePipe.transform(
                  founded?.createdAt.toString(),
                  'dd.MM.yyyy h:mm:ss a'
                ) || ''
              );
            },
          },
        },
      },
    });
  }
}
