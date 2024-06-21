import { Component } from '@angular/core';

@Component({
  selector: 'app-lawyer-layout',
  templateUrl: './lawyer-layout.component.html',
  styleUrl: './lawyer-layout.component.scss'
})
export class LawyerLayoutComponent {

  logoutCaseDiary() {
    localStorage.setItem('isCaseDiaryLogin', JSON.stringify(false));
  }
}
