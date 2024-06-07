import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { TransactionRoutingModule } from './transactions-routing.modules';
import { TransactionsComponent } from './transactions.component';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    TransactionRoutingModule
  ]
})
export class TransactionsModule { }
