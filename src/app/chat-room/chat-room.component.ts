import { Component } from '@angular/core';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  chatRoomForm: FormGroup;
  selectedChat: string = 'allChat';
  message: string = "";
  selectedChatRoom: any = {};
  selectedMembers: string[] = [];
  addMemberList: any = [];
  selectedAddMember: any = [];
  selectedRemoveMember: any = [];

  members = [
    { value: 'anilSoni', viewValue: 'Anil Soni' },
    { value: 'jayGoana', viewValue: 'Jay Goana' },
    { value: 'prateekjaiswal', viewValue: 'Prateek Jaiswal' },
    { value: 'ramSharma', viewValue: 'Ram Sharma' },
    { value: 'anoopUpadhyay', viewValue: 'Anoop Upadhyay' },
  ];

  roomList: any = [
    {
      image: '../../assets/images/image/chat-default.png',
      roomName: 'The Justice Squad',
      message: 'No problem! Let me know if...',
      participant: [],
      chatList: [
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
        }
      ],
      lastMessage: '',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      roomName: 'The Lawful Thinkers',
      message: 'No problem! Let me know if...',
      participant: [],
      chatList: [
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
        }
      ],
      lastMessage: '',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      roomName: 'The Legal Daredevils',
      message: 'Ok Thanks',
      participant: [],
      chatList: [
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
        }
      ],
      lastMessage: '',
    },
    {
      image: '../../assets/images/image/chat-default.png',
      roomName: 'The Justice League',
      message: 'Please provide me',
      participant: [],
      chatList: [
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
        }
      ],
      lastMessage: '',
    },
  ];

  constructor(private _router: Router, private _toastMessage: ToastMessageService, private formBuilder: FormBuilder) {
    this.chatRoomForm = new FormGroup({
      participant: new FormControl('', [Validators.required]),
      roomName: new FormControl('', [Validators.required]),
    })
    this.addMemberList = this.members;
  }


  ngAfterContentInit() {
    this.roomList.forEach((room: any) => { room.className = "colorless-border-label" })
    let element = document.getElementById('modalButton2') as HTMLElement;
    element.click();
    this.roomList[0].className = 'colored-border-label';
    this.selectedChatRoom = this.roomList[0];
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
    this.selectedChatRoom.chatList.push(newMessage);
    this.message = '';
    // let element = document.getElementById('chat-textarea') as HTMLElement;
    // element.scrollTo(0, 1000);
  }

  chatRoomSelectionChange(className: string, index: number, selectedChatRoom: any) {
    this.addMemberList = [];
    this.roomList.forEach((room: any) => {
      room.className = 'colorless-border-label';
    });
    this.roomList[index].className = className;
    this.selectedChatRoom = selectedChatRoom;

    this.members.forEach(member => {
      if (this.selectedChatRoom.participant.indexOf(member) == -1) {
        this.addMemberList.push(member);
      }
    })
  }

  notifyUser() {
    this._toastMessage.message('You can not add more than 20 Chat Rooms !!');
  }

  submit() {
    const newData = {
      image: '../../assets/images/image/chat-default.png',
      roomName: this.chatRoomForm.controls.roomName.value,
      message: "",
      participant: this.chatRoomForm.controls.participant.value,
      chatList: [],
    };
    this.roomList.unshift(newData);
    this.selectedChatRoom = this.roomList[0];
    this.roomList.forEach((room: any) => { room.className = "colorless-border-label" })
    this.roomList[0].className = 'colored-border-label';
  }

  filterMember(e: any) {
    let filter = e.target.value.toLowerCase();
    this.addMemberList = this.members.filter((key: any) =>
      key.viewValue.toLowerCase().startsWith(filter)
    );
  }

  addMember() {
    this.selectedChatRoom.participant = [...this.selectedChatRoom.participant, ...this.selectedAddMember];
    this._toastMessage.success('Members Added Successfully !!');
    this.selectedAddMember = '';
  }

  removeMember() {
    let length = this.selectedRemoveMember.length
    this.selectedChatRoom.participant.forEach((member: any, index: number) => {
      if (this.selectedRemoveMember.indexOf(member) != -1) {
        this.selectedChatRoom.participant.splice(index, length)
      }
    })
    this.selectedRemoveMember = '';
  }

  deleteChatRoom() {
    this.roomList.forEach((x: any, index: number) => {
      if (x.roomName == this.selectedChatRoom.roomName) {
        this.roomList.splice(index, 1)
        this.selectedChatRoom = this.roomList[0];
        this.roomList.forEach((room: any) => { room.className = "colorless-border-label" })
        this.roomList[0].className = 'colored-border-label';
      }
    })
  }
}
