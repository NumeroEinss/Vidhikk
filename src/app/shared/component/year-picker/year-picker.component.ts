import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from 'angular-calendar';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrl: './year-picker.component.scss',
  providers: [
    { provide: DateAdapter, useClass: YearPickerComponent },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } // Set locale as needed
  ],
})

export class YearPickerComponent {

  @Input('year') year: any;
  @Input('label') label: string = "";
  @Output() yearChange = new EventEmitter();
  today: Date = new Date();


  chooseYear($event: any, picker: any) {
    this.yearChange.emit([$event, picker]);
  }
}
