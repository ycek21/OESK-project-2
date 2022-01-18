/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HistoricDataService } from './historicData.service';

describe('Service: HistoricData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoricDataService]
    });
  });

  it('should ...', inject([HistoricDataService], (service: HistoricDataService) => {
    expect(service).toBeTruthy();
  }));
});
