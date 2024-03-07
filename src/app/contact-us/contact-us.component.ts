import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  selectedDiary: string = 'caseDiary';

  tickets: any[] = [
    { value: 'allTickets', viewValue: 'All Tickets'},  
  ];
}
