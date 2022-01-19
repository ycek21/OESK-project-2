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
  constructor() {}

  ngOnInit() {}
}
