import { Component } from '@angular/core';
import { ApolloService } from '../../shared/services/apollo.service';

@Component({
  selector: 'app-advocate-scheduling',
  templateUrl: './advocate-scheduling.component.html',
  styleUrl: './advocate-scheduling.component.scss'
})
export class AdvocateSchedulingComponent {
  isNameVisible: boolean = false;
  qrData: string = "Payment For Advocate Scheduling";

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
  transactionId: any = "";

  constructor(private _apolloService: ApolloService) {
    this.getQrData();
  }

  getQrData() {
    this._apolloService.post('/payment/make-payment', { amount: "10.00" }).subscribe(objRes => {
      if (objRes != null) {
        if (objRes.status == 'success') {
          this.qrData = objRes.data.url;
          this.transactionId = objRes.data.transactionId;
        }
      }
    })
  }
}
