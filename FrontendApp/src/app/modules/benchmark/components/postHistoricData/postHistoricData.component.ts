import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { switchMap } from 'rxjs';
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
    console.log('changes :>> ', changes);
    if (this.historicData.length === 2) {
      console.log('jest dwa :>> ');
      console.log('historicData :>> ', this.historicData);

      const chartType = this.historicData[0].quality;

      this.historicDataService
        .getDataForCertainQuality(chartType)
        .pipe(
          switchMap((x) => {
            this.historicDataWithNewMeasurement = [...x, ...this.historicData];
            console.log(
              'this.historicDataWithNewMeasurement  :>> ',
              this.historicDataWithNewMeasurement
            );

            return this.historicDataService.postHistoricData(
              this.historicData[0]
            );
          })
        )
        .subscribe((result) => {
          console.log('result :>> ', result);
          this.deleteElementsFromHistoricData.emit(true);
        });
    }
  }
}
