import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shared-chart',
  templateUrl: './shared-chart.component.html',
  styleUrls: ['./shared-chart.component.scss'],
})
export class SharedChartComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }
}
