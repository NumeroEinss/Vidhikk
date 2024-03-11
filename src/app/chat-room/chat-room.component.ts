import { AfterViewInit, Component } from '@angular/core';
import { SnackAlertService } from '../shared/services/snack-alert.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  selectedChat: string = 'allChat';
  message: string = 'Hey, start chat with....';
  member:string = '';
  roomName:string = '';
  // modalVisible = false;

  members = [
    { value: 'anilSoni', viewValue: 'Anil Soni' },
    { value: 'jayGoana', viewValue: 'Jay Goana' },
    { value: 'prateekjaiswal', viewValue: 'Prateek Jaiswal' },
    { value: 'anjaliSharma', viewValue: 'Anjali Sharma' },
  ];

  roomList = [
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'The Justice Squad',
      message: 'No problem! Let me know if...',
      className: 'colorless-border-chatroom',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'The Lawful Thinkers',
      message: 'No problem! Let me know if...',
      className: 'colorless-border-label',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'The Legal Daredevils',
      message: 'Ok Thanks',
      className: 'colorless-border-label',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'The Justice League',
      message: 'Please provide me',
      className: 'colorless-border-label',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'The Legal Warriors',
      message: 'Thats Great',
      className: 'colorless-border-label',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'The Legal Knights',
      message: 'What about you',
      className: 'colorless-border-label',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'The Law Titans',
      message: 'No problem! Let me know if...',
      className: 'colorless-border-label',
    },  
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'Legal Lions',
      message: 'No problem! Let me know if...',
      className: 'colorless-border-label',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'Legal Crusaders',
      message: 'No problem! Let me know if...',
      className: 'colorless-border-label',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      groupName: 'Justice League',
      message: 'No problem! Let me know if...',
      className: 'colorless-border-label',
    },  
  ];

  chatList = [
    {
      type: 'schedule',
      name: '',
      time: '',
      message: 'Today',
      userImage: '',
    },
    {
      type: 'sender',
      name: 'Anil Soni',
      time: '05:32 pm',
      message: 'Hey! how are you?',
      senderImage: '../../assets/images/image/add_member2.png',
    },
    {
      type: 'receiver',
      name: 'lavkush Mishra',
      time: '05:32 pm',
      message: 'I am fine...',
      receiverImage: '../../assets/images/image/add_member.png',
    },
    {
      type: 'receiver',
      name: 'lavkush Mishra',
      time: '05:33 pm',
      message: 'What about you..?',
      receiverImage: '../../assets/images/image/add_member.png',
    },
    {
      type: 'sender',
      name: 'Anil Soni',
      time: '05:35 pm',
      message:
        'I am also good. It is pretty sleek, black with a subtle gold trim. Looks quite professional.',
      senderImage: '../../assets/images/image/add_member2.png',
    },
    {
      type: 'sender',
      name: 'Anil Soni',
      time: '05:35 pm',
      message:
        ' Yeah, it says it is made of genuine leather. The reviews also seem positive. I think I will go for it.',
      senderImage: '../../assets/images/image/add_member2.png',
    },
  ];

  constructor(private _toastMessage: SnackAlertService) { }

  ngAfterContentInit() {
    let element = document.getElementById('modalButton2') as HTMLElement;
    element.click();
    this.roomList[0].className = 'colored-border-label';
  }

  addMessage() {
    const newMessage = {
      type: 'sender',
      name: 'Anil Soni',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      message: this.message,
      senderImage: '../../assets/images/image/add_member2.png',
    };
    this.chatList.push(newMessage);
    this.message = '';
    // let element = document.getElementById('chat-textarea') as HTMLElement;
    // element.scrollTo(0, 1000);
  }

  addStyling(className: string, index: number) {
    this.roomList.forEach((room) => {
      room.className = 'colorless-border-label';
    });
    this.roomList[index].className = className;
  }

  notifyUser() {
    this._toastMessage.message('You cannot add more than 20 Chat Rooms !!');
  }

  submit(){
    const newData = {
      image: '../../assets/images/image/chat-default.png',
      groupName: this.roomName,
      message: this.message,   
      className: 'colorless-border-chatroom',
    };

    this.roomList.push(newData);
    this.member = ''
    this.roomName = '' 

    // let element = document.getElementById("createChatRoomModal") as HTMLElement;
    // element.close()
  }
}
