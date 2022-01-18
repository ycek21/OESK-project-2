import { forkJoin } from 'rxjs';
import { HistoricDataService } from './../services/historicData.service';
import { Component, OnInit } from '@angular/core';
import { HistoricData } from '../models/historicData';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  // dataSourceSmall: HistoricData[] = [];
  // dataSourceMedium: HistoricData[] = [];
  // dataSourceLarge: HistoricData[] = [];
  dataSource: [HistoricData[], HistoricData[], HistoricData[]] = [[], [], []];
  constructor(private historicDataService: HistoricDataService) {}

  ngOnInit() {
    let small = this.historicDataService.getdatawithSmallQuality();
    let medium = this.historicDataService.getdatawithMediumQuality();
    let large = this.historicDataService.getdatawithLargeQuality();
    forkJoin([small, medium, large]).subscribe((results) => {
      this.dataSource = results;
    });
  }
}
