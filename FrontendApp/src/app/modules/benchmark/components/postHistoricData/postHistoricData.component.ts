import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { HistoricData } from 'src/app/modules/historic-data/models/historicData';
import { HistoricDataService } from 'src/app/modules/historic-data/services/historicData.service';

@Component({
  selector: 'app-postHistoricData',
  templateUrl: './postHistoricData.component.html',
  styleUrls: ['./postHistoricData.component.scss'],
})
export class PostHistoricDataComponent implements OnInit, OnChanges {
  @Input() historicData: HistoricData[] = [];
  @Output() deleteElementsFromHistoricData: EventEmitter<boolean> =
    new EventEmitter();

  historicDataWithNewMeasurement: HistoricData[] = [];

  constructor(private historicDataService: HistoricDataService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.prepareDataForChartsAndPostData();
  }

  private prepareDataForChartsAndPostData() {
    if (this.historicData.length === 2) {
      const chartType = this.historicData[0].quality;

      this.historicDataService
        .getDataForCertainQuality(chartType)
        .pipe(
          switchMap((x) => {
            this.historicDataWithNewMeasurement = [...x, ...this.historicData];
            const postHistoricDataObservables: Observable<Object>[] = [];

            this.historicData.forEach((row) => {
              const observable = this.historicDataService.postHistoricData(row);
              postHistoricDataObservables.push(observable);
            });

            return forkJoin(postHistoricDataObservables);
          })
        )
        .subscribe(() => {
          this.deleteElementsFromHistoricData.emit(true);
        });
    }
  }
}
