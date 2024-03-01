import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CalendarComponent, CalendarHeaderComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class CalendarsModule {}
