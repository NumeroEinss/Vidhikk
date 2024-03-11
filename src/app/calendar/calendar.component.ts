import { Component } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
} from '@angular/material/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';

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

  events: CalendarEvent[] = [
    {
      title: 'Editable event',
      color: colors.yellow,
      start: new Date(),
      actions: [
        {
          label: 'Edit',
          onClick: ({ event }: { event: CalendarEvent }) =>
            this.editEvent(event),
        },
      ],
    },
    {
      title: 'Deletable event',
      color: colors.blue,
      start: new Date(),
      actions: [
        {
          label: 'Delete',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log('Event deleted', event);
          },
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

  eventType: string = 'allEvent';

  availabilityList: any = [
    {
      id: 'fasdljasdfa',
      date: new Date().toLocaleDateString(),
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
      date: new Date().toLocaleDateString(),
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
      date: new Date().toLocaleDateString(),
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

  editEvent(e: CalendarEvent) {
    console.log(e);
  }
}
