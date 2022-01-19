/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SharedChartComponent } from './shared-chart.component';

describe('SharedChartComponent', () => {
  let component: SharedChartComponent;
  let fixture: ComponentFixture<SharedChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
