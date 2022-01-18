import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  declarations: [NavigationComponent, ChartComponent],
  exports: [
    MatToolbarModule,
    NavigationComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    ChartComponent,
  ],
})
export class SharedModule {}
