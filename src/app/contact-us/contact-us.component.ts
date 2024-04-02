import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SnackAlertService } from '../shared/services/snack-alert.service';
import { TicketModel } from '../common/ticket.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  selectedTicket: string = 'allTickets';
  ticketForm: FormGroup;
  selectedMemberTicket: any = {};
  selectedEditTicket: any;

  tickets: any[] = [
    { value: 'allTickets', viewValue: 'All Tickets' },
  ];

  ticketList = [
    {
      serialNo: 1,
      ticketTitle: 'Family Law',
      ticketType: 'Payment Issue',
      created: '12 Mar 2023',
      status: 'Close',
      description: 'I have family issue...',
    },
    {
      serialNo: 2,
      ticketTitle: 'Criminal Law',
      ticketType: 'Subscription Issue',
      created: '11 Dec 2023',
      status: 'inProcess',
      description: 'I have criminal issue...',
    },
    {
      serialNo: 3,
      ticketTitle: 'Property and Real Estate',
      ticketType: 'Payment Issue',
      created: '09 Mar 2023',
      status: 'Pending',
      description: 'I have family issue...',
    },
    {
      serialNo: 4,
      ticketTitle: 'Divorce Law',
      ticketType: 'Chat Support',
      created: '23 Nov 2023',
      status: 'Close',
      description: 'I have subscription issue...',
    },
    {
      serialNo: 5,
      ticketTitle: 'Family Law',
      ticketType: 'Payment Issue',
      created: '11 Aug 2022',
      status: 'Pending',
      description: 'I have payment issue...',
    },
    {
      serialNo: 6,
      ticketTitle: 'Divorce Law',
      ticketType: 'Chat Support',
      created: '22 March 2023',
      status: 'inProcess',
      description: 'I have subscription issue...',
    },
  ];

  supportList = [
    { value: 'Payment Issue', viewValue: 'Payment Issue' },
    { value: 'Chat Support', viewValue: 'Chat Support' },
    { value: 'Conferencing', viewValue: 'Conferencing' },
    { value: 'Subscription Issue', viewValue: 'Subscription Issue' },
  ];

  constructor(private _formBuilder: FormBuilder, private _toastMessage: SnackAlertService) {
    this.ticketForm = this._formBuilder.group(new TicketModel());
    this.ticketFrmCtrl['ticketTitle'].setValidators([Validators.required,]);
    this.ticketFrmCtrl['ticketType'].setValidators([Validators.required,]);
    this.ticketFrmCtrl['description'].setValidators([Validators.required, Validators.maxLength(100)]);
  }

  get ticketFrmCtrl() {
    return this.ticketForm.controls;
  }

  createTicket() {
    const newTicket = {
      serialNo: this.ticketList.length + 1,
      ticketTitle: this.ticketForm.controls.ticketTitle.value,
      ticketType: this.ticketForm.controls.ticketType.value,
      description: this.ticketForm.controls.description.value,
      created: new Date().toLocaleDateString(),
      status: 'inProcess',
    }
    this.ticketList.push(newTicket);
    this.ticketForm.reset();
  }

  editTicket(ticket: any) {
    this.selectedEditTicket = { ...ticket }
    this.ticketForm.patchValue({
      ticketTitle: ticket.ticketTitle,
      ticketType: ticket.ticketType,
      description: ticket.description
    })
    this.selectedEditTicket = {};
  }

  saveChanges() {
    let index = this.ticketList.map(ticket => ticket.serialNo).indexOf(this.selectedEditTicket.serialNo);
    this.ticketList[index] = {
      serialNo: this.selectedEditTicket.serialNo,
      ticketTitle: this.ticketForm.controls.ticketTitle.value,
      ticketType: this.ticketForm.controls.ticketType.value,
      created: this.selectedEditTicket.created,
      status: this.selectedEditTicket.status,
      description: this.ticketForm.controls.description.value,
    };
    this.selectedEditTicket = {};
    this.ticketForm.reset();
  }

  deleteTicket() {
    this.ticketList.forEach((ticket: any, index: any) => {
      if (ticket.serialNo == this.selectedMemberTicket.serialNo) {
        this.ticketList.splice(index, 1)
      }
    })
    this.ticketList.forEach((ticket: any, index: number) => {
      ticket.serialNo = index + 1;
    })

    this._toastMessage.message('Ticket Deleted Successfully!!');
  }
}
