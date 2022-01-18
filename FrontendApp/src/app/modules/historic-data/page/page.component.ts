import { Component, OnInit } from '@angular/core';
import { Data } from '../models/dataModel';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  dataSource: Data[] = [
    {
      numberOfPhotos: 1,
      time: 30,
    },
    {
      numberOfPhotos: 5,
      time: 60,
    },
    {
      numberOfPhotos: 1,
      time: 10,
    },
    {
      numberOfPhotos: 30,
      time: 90,
    },
  ];
  constructor() {}

  ngOnInit() {}
}
