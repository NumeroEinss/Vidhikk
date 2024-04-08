import { Component } from '@angular/core';

@Component({
  selector: 'app-advocate-scheduling',
  templateUrl: './advocate-scheduling.component.html',
  styleUrl: './advocate-scheduling.component.scss'
})
export class AdvocateSchedulingComponent {
  isNameVisible: boolean = false;

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
          status: 'available',
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
          status: 'available',
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
    {
      id: 'fasdasdfljasdfa',
      date: new Date(),
      timeSlot: [
        {
          slot: '5pm-6pm',
          status: 'available',
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
          status: 'available',
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
          status: 'available',
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
          status: 'available',
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
    }
  ];
}
