import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementsComponent } from './increments/increments.component';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    IncrementsComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ],
  exports: [
    IncrementsComponent,
    DonaComponent
  ]
})
export class ComponentsModule { }
