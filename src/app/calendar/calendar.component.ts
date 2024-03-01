import { Component } from '@angular/core';
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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
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
          label: '<i class="fas fa-fw fa-pencil-alt"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            console.log('Edit event', event);
          },
        },
      ],
    },
    {
      title: 'Deletable event',
      color: colors.blue,
      start: new Date(),
      actions: [
        {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
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
      id:'fasdljasdfa',
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
      ]
    },
    {
      id:'fasdasdfljasdfa',
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
      ]
    },
    {
      id:'ewrewrewrx',
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
      ]
    }
  ];
}
