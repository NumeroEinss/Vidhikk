import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrl: './conference-list.component.scss'
})
export class ConferenceListComponent {

  conferenceList=[
    {
      id:'1',
      clientName:'Shyam Sundar',
      date:'12 March 2023',
      time:'07:30 PM'
    },
    {
      id:'2',
      clientName:'Nitin Nainwal',
      date:'12 March 2023',
      time:'07:30 PM'
    },
  ];

  constructor(private _router: Router) {}

  viewConferenceList(conferenceId: any){
    this._router.navigate([`lawyer/conference/conference/${conferenceId}`]);
  }
}
