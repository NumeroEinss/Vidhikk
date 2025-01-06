import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { imageUrl } from '../../graphql.module';

@Component({
  selector: 'app-contact-us-detail',
  templateUrl: './contact-us-detail.component.html',
  styleUrl: './contact-us-detail.component.scss'
})
export class ContactUsDetailComponent {
  routerState: any;
  comment: string = '';
  isCommentBoxOpen: boolean = true;
  isPost: boolean = false;
  ticketDetail: any;
  feedList = [];

  constructor(private _location: Location, private _router: Router, private _apolloService: ApolloService,
    private _toastMessage: ToastMessageService) {
    this.routerState = this._router.getCurrentNavigation()?.extras.state;
    if (this.routerState == undefined) {
      this.routeBack();
    }
    else {
      this.getTicketDetail();
    }
  }

  routeBack() {
    this._location.back();
  }

  getImageToDisplay(image: any) {
    return imageUrl() + '/' + image;
  }

  addComment() {
    if (this.comment == "") {
      this._toastMessage.error('Enter Something to post !!');
    }
    else {
      let userData = JSON.parse(sessionStorage.getItem('userData')!);
      let data = {
        ticketId: this.ticketDetail._id,
        replyText: this.comment,
        replyType: userData.userType,
        replyFrom: userData._id
      };
      this._apolloService.mutate(GQLConfig.replyTicket, data).subscribe(objRes => {
        if (objRes.data != null) {
          if (objRes.data.replyTicket.status == 200) {
            this._toastMessage.message(objRes.data.replyTicket.message);
            this.ticketDetail = objRes.data.replyTicket.data;
            this.comment = "";
            this.getTicketDetail();
          }
          else {
            this._toastMessage.error(objRes.data.replyTicket.message)
          }
        }
      })
    }
  }

  getDay(date: Date) {
    return new Date(date).toLocaleDateString('en-GB', { weekday: "short" });
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', day: 'numeric' });
  }

  getTime(date: Date) {
    return new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }).replace('pm', 'PM')
  }

  openImage(img: any) {
    window.open(this.getImageToDisplay(img), 'blank')
  }

  getTicketDetail() {
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    this._apolloService.mutate(GQLConfig.getTicketDetail, { ticketId: this.routerState.ticket_id, lawyerId: userData._id }).subscribe(objRes => {
      if (objRes.data != null) {
        if (objRes.data.getTicketDetail.status == 200) {
          this._toastMessage.message(objRes.data.getTicketDetail.message);
          this.ticketDetail = objRes.data.getTicketDetail.data;
        }
        else {
          this._toastMessage.error(objRes.data.getTicketDetail.message)
        }
      }
    })
  }
}
