import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SnackAlertService } from '../shared/services/snack-alert.service';
import { TicketModel } from '../common/ticket.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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

  files: File[] = [];
  fileUploaded: boolean = false;

  @ViewChild('fileInput') fileInput: any;

  tickets: any[] = [
    { value: 'allTickets', viewValue: 'All Tickets' },
  ];

  ticketList = [
    {
      ticketId: 'Ticket# 2024-1',
      ticketTitle: 'Family Law',
      ticketType: 'Payment Issue',
      created: '12 Mar 2023',
      day: 'Mon',
      time: '12:00 AM',
      status: 'Close',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur ad',
      screenshot: ['../../assets/images/image/screenshot.jpg']
    },
    {
      ticketId: 'Ticket# 2024-2',
      ticketTitle: 'Criminal Law',
      ticketType: 'Subscription Issue',
      created: '11 Dec 2023',
      day: 'Tues',
      time: '12:00 AM',
      status: 'InProcess',
      description: 'I have criminal issue...',
      screenshot: ['../../assets/images/image/screenshot.jpg']
    },
    {
      ticketId: 'Ticket# 2024-3',
      ticketTitle: 'Property and Real Estate',
      ticketType: 'Payment Issue',
      created: '09 Mar 2023',
      day: 'Wed',
      time: '06:09 PM',
      status: 'Pending',
      description: 'I have family issue...',
      screenshot: ['../../assets/images/image/screenshot.jpg']
    },
    {
      ticketId: 'Ticket# 2024-4',
      ticketTitle: 'Divorce Law',
      ticketType: 'Chat Support',
      created: '23 Nov 2023',
      day: 'Mon',
      time: '12:00 AM',
      status: 'Close',
      description: 'I have subscription issue...',
      screenshot: ['../../assets/images/image/screenshot.jpg']
    },
    {
      ticketId: 'Ticket# 2024-5',
      ticketTitle: 'Family Law',
      ticketType: 'Payment Issue',
      created: '11 Aug 2022',
      day: 'Fri',
      time: '12:45 PM',
      status: 'Pending',
      description: 'I have payment issue...',
      screenshot: ['../../assets/images/image/screenshot.jpg']
    },
    {
      ticketId: 'Ticket# 2024-6',
      ticketTitle: 'Divorce Law',
      ticketType: 'Chat Support',
      created: '22 March 2023',
      day: 'Sat',
      time: '03:00 PM',
      status: 'InProcess',
      description: 'I have subscription issue...',
      screenshot: ['../../assets/images/image/screenshot.jpg']
    },
  ];

  supportList = [
    { value: 'Payment Issue', viewValue: 'Payment Issue' },
    { value: 'Chat Support', viewValue: 'Chat Support' },
    { value: 'Conferencing', viewValue: 'Conferencing' },
    { value: 'Subscription Issue', viewValue: 'Subscription Issue' },
  ];

  constructor(private _formBuilder: FormBuilder, private _toastMessage: SnackAlertService,
    private _router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog, private http: HttpClient) {
    this.ticketForm = this._formBuilder.group(new TicketModel());
    this.ticketFrmCtrl['ticketTitle'].setValidators([Validators.required,]);
    this.ticketFrmCtrl['ticketType'].setValidators([Validators.required,]);
    this.ticketFrmCtrl['description'].setValidators([Validators.required, Validators.minLength(10)]);
  }

  onFileSelected(event: any): void {
    this.files = event.target.files;
    this.fileUploaded = true;
  }

  onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.files = Array.from(event.dataTransfer.files);
    this.fileUploaded = true;
  }

  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  get ticketFrmCtrl() {
    return this.ticketForm.controls;
  }

  createTicket() {
    const filesArray = Array.from(this.files);
    const screenshotUrls = filesArray.map(file => URL.createObjectURL(file));
    const newTicket: any = {
      ticketId: 'Ticket# 2024-1',
      ticketTitle: this.ticketForm.controls.ticketTitle.value,
      ticketType: this.ticketForm.controls.ticketType.value,
      description: this.ticketForm.controls.description.value,
      created: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric', day: 'numeric' }),
      day: new Date().toLocaleDateString('en-GB', { weekday: "short" }),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }),
      status: 'InProcess',
      screenshot: screenshotUrls
    }
    this.ticketList.push(newTicket);
    this.resetForm();
  }

  editTicket(ticket: any) {
    this.selectedEditTicket = { ...ticket };
    this.ticketForm.patchValue({
      ticketTitle: ticket.ticketTitle,
      ticketType: ticket.ticketType,
      description: ticket.description,
    })
  }

  saveChanges() {
    let index = this.ticketList.map(ticket => ticket.ticketId).indexOf(this.selectedEditTicket.ticketId);
    this.ticketList[index] = {
      ticketId: this.selectedEditTicket.ticketId,
      ticketTitle: this.ticketForm.controls.ticketTitle.value,
      ticketType: this.ticketForm.controls.ticketType.value,
      created: this.selectedEditTicket.created,
      day: this.selectedEditTicket.day,
      time: this.selectedEditTicket.time,
      status: this.selectedEditTicket.status,
      description: this.ticketForm.controls.description.value,
      screenshot: this.selectedEditTicket.screenshot
    };
    this.selectedEditTicket = {};
    this.resetForm();
  }

  deleteTicket() {
    this.ticketList.forEach((ticket: any, index: any) => {
      if (ticket.ticketId == this.selectedMemberTicket.ticketId) {
        this.ticketList.splice(index, 1)
      }
    })
    this._toastMessage.message('Ticket Deleted Successfully!!');
  }

  resetForm() {
    this.ticketForm.reset();
    this.ticketForm.patchValue(new TicketModel);
  }

  redirectToContactDetail(ticket: any) {
    this._router.navigate(['/user/contact-us/contact-us-detail'], { state: ticket })
  }
}
