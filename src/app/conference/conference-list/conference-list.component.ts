import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrl: './conference-list.component.scss'
})
export class ConferenceListComponent {

  conferenceList = [
    {
      id: '1',
      clientName: 'Shyam Sundar',
      date: '12 March 2023',
      time: '07:30 PM'
    },
    {
      id: '2',
      clientName: 'Nitin Nainwal',
      date: '12 March 2023',
      time: '07:30 PM'
    },
  ];
  userType: string = "";

  constructor(private _router: Router) {
    this.userType = _router.url.split('/')[1];
  }

  viewConferenceList(conferenceId: any) {
    this._router.navigate([`lawyer/conference/conference/${conferenceId}`]);
  }

  joinConference() {
    if (this.userType == 'user') {
      let element = document.getElementById('conferenceDisclaimer') as HTMLElement;
      element.click();
    }
    else if (this.userType == 'lawyer') {
      let userId = 'dgdfg7897yhvjbjrtyu';
      this._router.navigate([`/lawyer/conference/${userId}`]);
    }
  }
}
