import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  selectedTicket: string = 'allTickets';
  ticketFormGroup : FormGroup;

  tickets: any[] = [
    { value: 'allTickets', viewValue: 'All Tickets' },
  ];

  ticketList = [
    {
      ticketId: '1',
      ticketTitle: 'Family Law',
      ticketType:'Payment Issue',
      created: '12 Mar 2023',
      status: 'Close',
    },
    {
      ticketId: '2',
      ticketTitle: 'Criminal Law',
      ticketType:'Subscription Issue',
      created: '11 Dec 2023',
      status: 'inProcess',
    },
    {
      ticketId: '3',
      ticketTitle: 'Property and Real Estate',
      ticketType:'Payment Issue',
      created: '09 Mar 2023',
      status: 'Pending',
    },
    {
      ticketId: '4',
      ticketTitle: 'Divorce Law',
      ticketType:'Subscription Issue',
      created: '23 Nov 2023',
      status: 'Close',
    },
    {
      ticketId: '5',
      ticketTitle: 'Family Law',
      ticketType:'Payment Issue',
      created: '11 Aug 2022',
      status: 'Pending',
    },
    {
      ticketId: '6',
      ticketTitle: 'Divorce Law',
      ticketType:'Subscription Issue',
      created: '22 March 2023',    
      status: 'inProcess',
    },
  ];

  supportList = [
    { value: 'payment', viewValue: 'Payment Issues' },
    { value: 'chat', viewValue: 'Chat Support' },
    { value: 'conference', viewValue: 'Conferencing' },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.ticketFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      typeOfSupport: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    })
  }
}
