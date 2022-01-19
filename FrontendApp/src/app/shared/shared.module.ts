import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedChartComponent } from './components/shared-chart/shared-chart.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

// import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
  ],
  declarations: [NavigationComponent, SharedChartComponent],
  exports: [
    MatToolbarModule,
    NavigationComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    SharedChartComponent,
    MatListModule,
    MatCardModule,
  ],
})
export class SharedModule {}
