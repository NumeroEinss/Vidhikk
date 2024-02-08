import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements AfterViewInit{


  constructor() {

  }

  ngAfterViewInit() {
    let element = document.getElementById('modalButton') as HTMLElement;
    element.click();
  }
}
