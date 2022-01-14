import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { Data } from 'src/app/modules/historic-data/models/dataModel';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  title = 'Small quality of photo';
  myType = ChartType.ScatterChart;
  // data = [
  //   ['Firefox', 45.0],
  //   ['IE', 26.8],
  //   ['Chrome', 12.8],
  //   ['Safari', 8.5],
  //   ['Opera', 6.2],
  //   ['Others', 0.7],
  // ];
  columnNames = ['Number of photos', 'Time'];
  options = {
    vAxis: { title: 'Time [s]', minValue: 0, maxValue: 15 },
    hAxis: { title: 'Number of photos', minValue: 0, maxValue: 15 },
    legend: 'none',
  };
  width = 550;
  height = 400;
  @Input() data: Data[] = [];
  dataAsArray: any;

  constructor() {}

  ngOnInit() {
    this.dataAsArray = this.data.map((x) => Array.from(Object.values(x)));
    console.log(this.dataAsArray);
  }
}
