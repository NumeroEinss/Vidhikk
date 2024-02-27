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
}
