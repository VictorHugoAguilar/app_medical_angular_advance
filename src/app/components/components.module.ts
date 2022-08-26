import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementsComponent } from './increments/increments.component';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';


@NgModule({
  declarations: [
    IncrementsComponent,
    DonaComponent,
    ModalImagenComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ],
  exports: [
    IncrementsComponent,
    DonaComponent,
    ModalImagenComponent
  ]
})
export class ComponentsModule { }
