import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent implements AfterViewInit {
  selectedChat: string = 'allChat';
  message: string = '';

  members = [
    { value: 'anilSoni', viewValue: 'Anil Soni' },
    { value: 'jayGoana', viewValue: 'Jay Goana' },
    { value: 'prateekjaiswal', viewValue: 'Prateek Jaiswal' },
    { value: 'anjaliSharma', viewValue: 'Anjali Sharma' },
  ];

  roomList = [
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Anil Soni',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Jay Goana',
      message: 'Ok Thanks',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Pratik Jaiswal',
      message: 'Please provide me',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Anjali Sharma',
      message: 'Thats Great',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Nitin Jaiswal',
      message: 'What about you',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Anil Soni',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Anil Soni',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Anil Soni',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Anil Soni',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Anil Soni',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member.png',
      name: 'Priya Singh',
      message: 'No problem! Let me know if...',
      className: '',
    },
    {
      image: '../../assets/images/image/add_member2.png',
      name: 'Anil Soni',
      message: 'No problem! Let me know if...',
      className: '',
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

  constructor() {}

  ngAfterViewInit() {
    let element = document.getElementById('modalButton2') as HTMLElement;
    element.click();
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
    let element = document.getElementById('chat-textarea') as HTMLElement;
    element.scrollTo(0, 1000);
  }

  addStyling(className: string, index: number) {
    this.roomList.forEach((room) => {
      room.className = '';
    });
    this.roomList[index].className = className;
  }
}
