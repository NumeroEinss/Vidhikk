import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advocate',
  templateUrl: './advocate.component.html',
  styleUrl: './advocate.component.scss'
})
export class AdvocateComponent {

  lawyer: any = {
    type: 'Criminal Lawyer',
    caseWon: '40+ Cases',
    rating: '4.5',
    location: 'Vijay Nagar, Indore , M.P.',
    lawsuit: '43 Clients',
    fileAchievement: '97%',
    experience: '10+ Years',
    stateBar: 'State Bar',
    practisingCourt: 'Practising Court',
    practisingField: 'Criminal',
    barLiscense: 'EB/04813/2021',
    phoneNo: '9874563215',
    mail: 'test@gmail.com',
    name: 'Kapil Sibbal'
  };

  isNameVisible: boolean = false;
  activeRoute: string = "";

  constructor(private _router: Router) {
    this.activeRoute = this._router.url
  }

  viewRating(){
    this._router.navigate(['/user/advocates/gfdyfvayfd/advocate-rating'])
  }
}
