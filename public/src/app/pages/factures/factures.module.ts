import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturesRoutingModule } from './factures-routing.module';
import { FacturesComponent } from './factures.component';


@NgModule({
  declarations: [
    FacturesComponent
  ],
  imports: [
    CommonModule,
    FacturesRoutingModule
  ]
})
export class FacturesModule { }
