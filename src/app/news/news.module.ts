import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { NewsRoutingModule } from './news-routing.module';
import {NewsComponent} from './news.component'


@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
