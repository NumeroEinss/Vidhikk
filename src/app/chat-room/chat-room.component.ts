import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements AfterViewInit {

  selectedChat: string = 'allChat';

  members = [
    { value: 'anilSoni', viewValue: 'Anil Soni' },
    { value: 'jayGoana', viewValue: 'Jay Goana' },
    { value: 'prateekjaiswal', viewValue: 'Prateek Jaiswal' },
    { value: 'anjaliSharma', viewValue: 'Anjali Sharma' },
  ];

  chats = [
    { value: 'allChat', viewValue: 'All Chat' },
  ];

  lawyerList = [
    {
      roomId: '1',
      roomName: 'Dog Murder Allegation',
      created: '12 Mar 2023',
      onlineLawyers: [
        {
          name:'',
          profileImage:'../../../assets/images/image/anurag_goyal.jpg'
        }
      ],    
    },
    {
      roomId: '2',
      roomName: 'Dog Murder Allegation',
      created: '11 Dec 2022',
      onlineLawyers: [
        {
          name:'',
          profileImage:'../../../assets/images/image/anurag_goyal.jpg'
        }
      ],    
    },
    {
      roomId: '3',
      roomName: 'Dog Murder Allegation',
      created: '1 Feb 2023',
      onlineLawyers:[
        {
          name:'',
          profileImage:'../../../assets/images/image/anurag_goyal.jpg'
        }
      ],       
    },
    {
      roomId: '4',
      roomName: 'Dog Murder Allegation',
      created: '16 Jul 2023',
      onlineLawyers:[
        {
          name:'',
          profileImage:'../../../assets/images/image/anurag_goyal.jpg'
        }
      ],    
    },
    {
      roomId: '5',
      roomName: 'Dog Murder Allegation',
      created: '12 March 2023',
      onlineLawyers: [
        {
          name:'',
          profileImage:'../../../assets/images/image/anurag_goyal.jpg'
        }
      ],        
    },
  ];


  constructor() {}

  ngAfterViewInit() {
    let element = document.getElementById('modalButton2') as HTMLElement;
    element.click();
  }

}
