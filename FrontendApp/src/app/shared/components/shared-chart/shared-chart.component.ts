import { DatePipe } from '@angular/common';
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
  @Input() chartType: string = '';
  chart: any = [];
  constructor(private datePipe: DatePipe) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.createChart(this.dataForChart, 'canvas', this.chartType);
  }
  seperateDate(data: HistoricData[]) {
    let newData = data.slice(1).slice(-2);
    let oldData = data.slice(0, -2);
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
          fontColor: 'black',
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
