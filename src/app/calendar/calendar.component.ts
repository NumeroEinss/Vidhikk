import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
} from '@angular/material/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { addDays } from 'date-fns';
import { SnackAlertService } from '../shared/services/snack-alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalendarModel } from '../common/calendarModel';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  eventToBeDeleted: CalendarEvent | undefined;

  deleteSlotIndex: number = 0;

  selectedTimes: any = { A: '', B: '' };

  events: CalendarEvent[] = [
    {
      title: 'Editable event',
      color: colors.yellow,
      start: new Date(),
      actions: [
        {
          label: 'Edit',
          onClick: ({ event }: { event: CalendarEvent }) => { console.log(event); },
        },
        {
          label: 'Delete Event ',
          onClick: ({ event }: { event: CalendarEvent }): void => { this.handleDelete(), this.eventToBeDeleted = event },
        },
      ],
    },
    {
      title: 'Deletable eventssss',
      color: colors.blue,
      start: addDays(new Date(), 2),
      actions: [
        {
          label: 'Delete Event ',
          onClick: ({ event }: { event: CalendarEvent }): void => { this.handleDelete(), this.eventToBeDeleted = event },
        },
      ],
    },
    {
      title: 'Non editable and deletable event',
      color: colors.red,
      start: new Date(),
    },
  ];

  eventTypeList = [
    { name: 'All Events', value: 'allEvent' },
    { name: 'Meetings', value: 'meetings' },
  ];

  repeatList = [
    { name: 'Once', value: 'once' },
    { name: 'Daily', value: 'daily' },
    { name: 'Mon to Friday', value: 'monToFriday' }
  ]

  reminderList = [
    { name: '1 hours before', value: '1hour' },
    { name: '2 hours before', value: '2hour' },
    { name: '3 hours before', value: '3hour' },
    { name: '4 hours before', value: '4hour' },
  ]

  eventType: string = 'allEvent';

  availabilityList: any = [ // Only slots from current date and after will fall under this.
    {
      id: 'fasdljasdfa',
      date: new Date(),
      timeSlot: [
        {
          slot: '5pm-6pm',
          status: 'booked',
        },
        {
          slot: '6pm-7pm',
          status: 'available',
        },
        {
          slot: '7pm-8pm',
          status: 'booked',
        },
        {
          slot: '8pm-9pm',
          status: 'booked',
        },
        {
          slot: '9pm-10pm',
          status: 'available',
        },
      ],
    },
    {
      id: 'fasdasdfljasdfa',
      date: new Date(),
      timeSlot: [
        {
          slot: '5pm-6pm',
          status: 'booked',
        },
        {
          slot: '6pm-7pm',
          status: 'available',
        },
        {
          slot: '7pm-8pm',
          status: 'booked',
        },
        {
          slot: '8pm-9pm',
          status: 'booked',
        },
        {
          slot: '9pm-10pm',
          status: 'available',
        },
      ],
    },
    {
      id: 'ewrewrewrx',
      date: new Date(),
      timeSlot: [
        {
          slot: '5pm-6pm',
          status: 'booked',
        },
        {
          slot: '6pm-7pm',
          status: 'available',
        },
        {
          slot: '7pm-8pm',
          status: 'booked',
        },
        {
          slot: '8pm-9pm',
          status: 'booked',
        },
        {
          slot: '9pm-10pm',
          status: 'available',
        },
      ],
    },
  ];

  today: Date = new Date();

  repeat: any = "";

  reminder: any = "";

  caseList = [
    {
      caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
      caseDesc:
        'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
      court: 'Supreme Court',
      bench: 'FB',
      cited: 0,
      acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    },
    {
      caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
      caseDesc:
        'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
      court: 'Supreme Court',
      bench: 'FB',
      cited: 0,
      acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    },
    {
      caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
      caseDesc:
        'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
      court: 'Supreme Court',
      bench: 'FB',
      cited: 0,
      acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    },
    {
      caseTitle: 'Nabha Power Limited VS Punjab Corporation on 9 October, 2023',
      caseDesc:
        'Electricity Act 2003 - Section 86(1)(a) read with section 62 - Recovery of deduction of monthly tarrif - Discrepancy in term of yield loss of quality of washed cool usually happens when good quality of cool was diverted under grab of reject in washing process..',
      court: 'Supreme Court',
      bench: 'FB',
      cited: 0,
      acts: 'Acts:  ELECTRICITY ACT: S62S.86(1)(a),',
    },
  ];

  displaySlot: any = [];

  slots: any = [
    { value: '11am - 12pm', viewValue: '11am - 12pm' },
    { value: '12:30pm - 01:30pm', viewValue: '12:30pm - 01:30pm' },
    { value: '2pm - 3pm', viewValue: '2pm - 3pm' },
    { value: '5pm-6pm', viewValue: '5pm-6pm' },
    { value: '6pm-7pm', viewValue: '6pm-7pm' },
    { value: '7pm-8pm', viewValue: '7pm-8pm' },
    { value: '8pm-9pm', viewValue: '8pm-9pm' },
  ];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  minDate: Date = new Date();

  slotDate: any = { _d: new Date() };

  slot: any = [];

  calendarForm: FormGroup;

  isEditMode: boolean = false;

  constructor(private _toastMessage: SnackAlertService, _fb: FormBuilder) {
    this.calendarForm = _fb.group(new CalendarModel);
  }

  editEvent(event: CalendarEvent, selectedEvent: any) {
    let elemement = document.getElementById('addEventButton') as HTMLElement;
    elemement.click();
    this.calendarForm.patchValue(selectedEvent);
  }

  handleDelete() {
    let deleteEventHandler = document.getElementById('deleteEventButton') as HTMLElement;
    deleteEventHandler.click();
  }

  deleteEvent() {
    this.events = this.events.filter((iEvent) => iEvent !== this.eventToBeDeleted);
  }

  handleDeleteAvailability() {
    let deleteAvailabilityHandler = document.getElementById('deleteAvailabilityButton') as HTMLElement;
    deleteAvailabilityHandler.click();  
  }

  deleteAvailability() {
    this.availabilityList.splice(this.deleteSlotIndex, 1);
    this._toastMessage.message('Availability Deleted Successfully!!');
  }

  editAvailability(slot: any) {
    this.isEditMode = true;
    this.slot = [];
    slot.timeSlot.forEach((element: any) => {
      this.slot.push(element.slot);
    });
    this.slotDate = {
      _d: slot.date
    };
    let element = document.getElementById('addAvailabilityButton') as HTMLElement;
    element.click();
  }

  onTimeSet(e: any) {

  }

  addAvailabilitySlot(e: any) {
    if (this.slotDate == null) {
      this._toastMessage.error('Date is Required !!')
    }
    if (this.slot.length == 0) {
      this._toastMessage.error('Select a slot to Add !!');
    }
    else {
      let slot: any = [];
      this.slot.forEach((item: any) => {
        slot.push({
          slot: item,
          status: 'available',
        },)
      });
      this.availabilityList.push(
        {
          id: 'seradadfasd' + Math.random().toFixed(1).toString(),
          date: this.slotDate._d,
          timeSlot: slot,
        }
      )
      let element = document.getElementById('cancelSlotButton') as HTMLElement;
      element.click();
      this.slot = [];
      this.slotDate = {
        _d: new Date()
      }
    }
  }
}
