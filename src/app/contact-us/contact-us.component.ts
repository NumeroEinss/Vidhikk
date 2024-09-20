import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { TicketModel } from '../common/ticket.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { GQLConfig } from '../graphql.operations';
import { ApolloService } from '../shared/services/apollo.service';

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

  files: any = { name: "No Files Selected" };
  fileUploaded: boolean = false;

  @ViewChild('fileInput') fileInput: any;

  tickets: any[] = [
    { value: 'allTickets', viewValue: 'All Tickets' },
  ];

  ticketList: any = [];

  supportList = [
    { value: 'Payment Issue', viewValue: 'Payment Issue' },
    { value: 'Chat Support', viewValue: 'Chat Support' },
    { value: 'Conferencing', viewValue: 'Conferencing' },
    { value: 'Subscription Issue', viewValue: 'Subscription Issue' },
    { value: 'Other', viewValue: 'Other' }
  ];

  constructor(private _formBuilder: FormBuilder, private _toastMessage: ToastMessageService, private _router: Router,
    private _apolloService: ApolloService) {
    this.ticketForm = this._formBuilder.group(new TicketModel());
    this.ticketFrmCtrl['ticketTitle'].setValidators([Validators.required,]);
    this.ticketFrmCtrl['ticketType'].setValidators([Validators.required,]);
    this.ticketFrmCtrl['ticketDescription'].setValidators([Validators.required, Validators.minLength(10)]);
    this.getTicketList();
  }

  onFileSelected(event: any): void {
    this.files = event.target.files[0];
    this.fileUploaded = true;
  }

  onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.files = event.dataTransfer.files[0];
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
    // const filesArray = this.files;
    // const screenshotUrls = filesArray.map((file: Blob | MediaSource) => URL.createObjectURL(file));
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};

    const mutation = {
      "query": "mutation createTicket($input: supportServiceInput!, $file: Upload) { createTicket(input: $input, file: $file) { status, message, data } }",
      "variables": {
        "input": {
          "Id": parsedData._id,
          "ticketType": this.ticketForm.controls.ticketType.value,
          "ticketTitle": this.ticketForm.controls.ticketTitle.value,
          "ticketDescription": this.ticketForm.controls.ticketDescription.value,
          "userType": parsedData.userType
        }
      }
    }

    this._apolloService.upload(mutation, this.files, "file").subscribe(objRes => {
      if (objRes.data != null) {
        this._toastMessage.success(objRes.data.createTicket.message);
        this.getTicketList();
        this.resetForm();
      }
      else {
        this._toastMessage.error(objRes.data.createTicket.message);
      }
    })
  }

  editTicket(ticket: any) {
    this.selectedEditTicket = { ...ticket };
    this.ticketForm.patchValue(ticket);
  }

  saveChanges() {

  }

  deleteTicket() {
    this._apolloService.mutate(GQLConfig.deleteTicket, { ticketId: this.selectedMemberTicket.ticket_id }).subscribe(data => {
      if (data.data !== null) {
        if (data.data.deleteTicket.status = 200) {
          this._toastMessage.success(data.data.deleteTicket.message);
          this.getTicketList();
        }
        else {
          this._toastMessage.error(data.data.deleteTicket.message);
        }
      }
    })
  }

  resetForm() {
    this.ticketForm.reset();
    this.ticketForm.patchValue(new TicketModel);
    this.files = { name: "No Files Selected" };
  }

  redirectToContactDetail(ticket: any) {
    console.log(ticket, 'ticket')
    let userData = sessionStorage.getItem('userData');
    let parsedData = JSON.parse(userData!)
    if (parsedData.userType == "LAWYER") {
      this._router.navigate(['/lawyer/contact-us/contact-us-detail'], { state: ticket });
    }
    else if (parsedData.userType == "USER") {
      this._router.navigate(['/user/contact-us/contact-us-detail'], { state: ticket })
    }
  }

  getTicketList() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this._apolloService.mutate(GQLConfig.getTicketList, { Id: parsedData._id, userType: parsedData.userType }).subscribe(data => {
      if (data.data !== null) {
        if (data.data.getTicketList.status = 200) {
          this._toastMessage.success(data.data.getTicketList.message);
          this.ticketList = data.data.getTicketList.data.ticketList;
        }
        else {
          this._toastMessage.error(data.data.getTicketList.message);
        }
      }
    })
  }
}
