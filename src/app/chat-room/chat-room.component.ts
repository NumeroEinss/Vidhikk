import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GQLConfig } from '../graphql.operations';
import { ApolloService } from '../shared/services/apollo.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../shared/services/socket.service';
import { NgScrollbar } from 'ngx-scrollbar';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @ViewChild('scrollBar') scrollbar!: NgScrollbar;
  chatRoomForm: FormGroup;
  selectedChat: string = 'allChat';
  message: string = "";
  selectedChatRoom: any = null;
  selectedMembers: string[] = [];
  addMemberList: any = [];
  selectedAddMember: any = [];
  selectedRemoveMember: any = [];
  isChatOpen: boolean = false;
  members: any = [];
  messageSubscription!: Subscription;
  chatList: any = [];
  roomSubscription!: Subscription;

  roomList: any = [
    // {
    //   image: '../../assets/images/image/chat-default.png',
    //   roomName: 'The Justice Squad',
    //   message: 'No problem! Let me know if...',
    //   participant: [],
    //   chatList: [
    //     {
    //       type: 'schedule',
    //       name: '',
    //       time: '',
    //       message: 'Today',
    //       userImage: '',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:32 pm',
    //       message: 'Hey! how are you?',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     },
    //     {
    //       type: 'receiver',
    //       name: 'lavkush Mishra',
    //       time: '05:32 pm',
    //       message: 'I am fine...',
    //       receiverImage: '../../assets/images/image/add_member.png',
    //     },
    //     {
    //       type: 'receiver',
    //       name: 'lavkush Mishra',
    //       time: '05:33 pm',
    //       message: 'What about you..?',
    //       receiverImage: '../../assets/images/image/add_member.png',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:35 pm',
    //       message:
    //         'I am also good. It is pretty sleek, black with a subtle gold trim. Looks quite professional.',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:35 pm',
    //       message:
    //         ' Yeah, it says it is made of genuine leather. The reviews also seem positive. I think I will go for it.',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     }
    //   ],
    //   lastMessage: '',
    // },
    // {
    //   image: '../../assets/images/image/chat-default.png',
    //   roomName: 'The Lawful Thinkers',
    //   message: 'No problem! Let me know if...',
    //   participant: [],
    //   chatList: [
    //     {
    //       type: 'schedule',
    //       name: '',
    //       time: '',
    //       message: 'Today',
    //       userImage: '',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:32 pm',
    //       message: 'Hey! how are you?',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     },
    //     {
    //       type: 'receiver',
    //       name: 'lavkush Mishra',
    //       time: '05:32 pm',
    //       message: 'I am fine...',
    //       receiverImage: '../../assets/images/image/add_member.png',
    //     },
    //     {
    //       type: 'receiver',
    //       name: 'lavkush Mishra',
    //       time: '05:33 pm',
    //       message: 'What about you..?',
    //       receiverImage: '../../assets/images/image/add_member.png',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:35 pm',
    //       message:
    //         'I am also good. It is pretty sleek, black with a subtle gold trim. Looks quite professional.',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     },
    //   ],
    //   lastMessage: '',
    // },
    // {
    //   image: '../../assets/images/image/chat-default.png',
    //   roomName: 'The Legal Daredevils',
    //   message: 'Ok Thanks',
    //   participant: [],
    //   chatList: [
    //     {
    //       type: 'schedule',
    //       name: '',
    //       time: '',
    //       message: 'Today',
    //       userImage: '',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:32 pm',
    //       message: 'Hey! how are you?',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     },
    //     {
    //       type: 'receiver',
    //       name: 'lavkush Mishra',
    //       time: '05:32 pm',
    //       message: 'I am fine...',
    //       receiverImage: '../../assets/images/image/add_member.png',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:35 pm',
    //       message:
    //         'I am also good. It is pretty sleek, black with a subtle gold trim. Looks quite professional.',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:35 pm',
    //       message:
    //         ' Yeah, it says it is made of genuine leather. The reviews also seem positive. I think I will go for it.',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     }
    //   ],
    //   lastMessage: '',
    // },
    // {
    //   image: '../../assets/images/image/chat-default.png',
    //   roomName: 'The Justice League',
    //   message: 'Please provide me',
    //   participant: [],
    //   chatList: [
    //     {
    //       type: 'schedule',
    //       name: '',
    //       time: '',
    //       message: 'Today',
    //       userImage: '',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:32 pm',
    //       message: 'Hey! how are you?',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     },
    //     {
    //       type: 'receiver',
    //       name: 'lavkush Mishra',
    //       time: '05:33 pm',
    //       message: 'What about you..?',
    //       receiverImage: '../../assets/images/image/add_member.png',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:35 pm',
    //       message:
    //         'I am also good. It is pretty sleek, black with a subtle gold trim. Looks quite professional.',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     },
    //     {
    //       type: 'sender',
    //       name: 'Anil Soni',
    //       time: '05:35 pm',
    //       message:
    //         ' Yeah, it says it is made of genuine leather. The reviews also seem positive. I think I will go for it.',
    //       senderImage: '../../assets/images/image/add_member2.png',
    //     }
    //   ],
    //   lastMessage: '',
    // },
  ];
  userId: any;

  constructor(private _router: Router, private _toastMessage: ToastMessageService, private formBuilder: FormBuilder,
    private _apolloService: ApolloService, private _socketService: SocketService
  ) {
    this.chatRoomForm = new FormGroup({
      participant: new FormControl('', [Validators.required]),
      roomName: new FormControl('', [Validators.required]),
    });
    this.userId = JSON.parse(sessionStorage.getItem('userData')!)._id;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.messageSubscription = this._socketService.onMessage().subscribe(data => {
      console.log('New message received:', data);
      // this.message = data;
      if (this.selectedChatRoom._id === data.roomId) {
        if (data.sender === this.userId) {

        } else {
          this.chatList.push(data);
        }
      }
    });
    this.roomSubscription = this._socketService.roomCreated().subscribe(data => {
      console.log('New room created:', data);
      this.getRoomList();
    });
  }

  ngAfterViewInit() {
    this.getMembersList();
    this.getRoomList();
  }

  ngAfterContentInit() {
    this.roomList.forEach((room: any) => { room.className = "colorless-border-label" })
    // let element = document.getElementById('modalButton2') as HTMLElement;
    // element.click();
    if (this.roomList.length > 0) {
      this.selectedChatRoom = this.roomList[0];
      this.roomList[0].className = 'colored-border-label';
    }
  }

  getMembersList() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {}
    this._apolloService.mutate(GQLConfig.getMemberList, { lawyerId: parsedData._id }).subscribe(resObj => {
      if (resObj.data != null) {
        if (resObj.data.getListMember.status == 200) {
          this.members = resObj.data.getListMember.data.memberList;
          this.addMemberList = this.members;
        }
        else {
          this._toastMessage.error(resObj.data.getListMember.message);
        }
      }
    })
  }

  async getRoomList() {
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    this._apolloService.get('/room', { userId: userData._id }).subscribe(objRes => {
      if (objRes.status == "success") {
        this.roomList = objRes.data;
        this._toastMessage.showLoader = false;
      }
      else {
        this._toastMessage.error(objRes.message);
      }
    })
  }

  // Need to be Implemented Dynamicall
  addMessage() {
    // const newMessage = {
    //   type: 'sender',
    //   name: 'Anil Soni',
    //   time: new Date().toLocaleTimeString([], {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //   }),
    //   message: this.message,
    //   senderImage: '../../assets/images/image/add_member2.png',
    // };
    // this.selectedChatRoom.chatList.push(newMessage);
    // this.message = '';
    const userData = JSON.parse(sessionStorage.getItem('userData')!);
    const reqObj = {
      sender: userData._id, roomId: this.selectedChatRoom._id, contents: this.message
    }
    if (this.message == "") {
      this._toastMessage.error("Please Enter Message !!");
    }
    else {
      console.log('reqObj', reqObj);
      this.chatList.push(reqObj);
      this._socketService.sendMessage(reqObj);
      this.message = '';
    }
  }

  async chatRoomSelectionChange(className: string, index: number, selectedChatRoom: any) {
    this.addMemberList = [];
    this.chatList = [];
    this.roomList.forEach((room: any) => {
      room.className = 'colorless-border-label';
    });
    this.roomList[index].className = className;
    this.selectedChatRoom = selectedChatRoom;

    await this.getChatList(selectedChatRoom);

    this.members.forEach((member: any) => {
      // Check if any object in selectedChatRoom.members has the same key-value pairs as obj1
      const matchFound = this.selectedChatRoom.members.some((selectedMember: any) => {
        // Check if all keys in members exist in selectedChatRoom.members with the same value
        return member.memberId === selectedMember.id;
      });

      // If no match found, push the object into the result array
      if (!matchFound) {
        this.addMemberList.push(member);
      }
    });
  }

  async getChatList(selectedChatRoom: any) {
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    this._apolloService.get(`/room/messages/${selectedChatRoom._id}`, { userId: userData._id }).subscribe(objRes => {
      if (objRes.status == 'success') {
        console.log('Chat Details', objRes.data);
        this.chatList = objRes.data || [];
      }
      else {
        this._toastMessage.error(objRes.message);
      }
    })
  }

  //for Chat Room Mobile View
  openChat(selectedChatRoom: any) {
    this.addMemberList = [];
    this.selectedChatRoom = selectedChatRoom;

    this.members.forEach((member: any) => {
      if (this.selectedChatRoom.members.indexOf(member) == -1) {
        this.addMemberList.push(member);
      }
    })

    let element1 = document.getElementById('groupList') as HTMLElement;
    element1.style.height = '0';
    element1.style.position = 'fixed';
    element1.style.zIndex = '-1';

    let element = document.getElementById('chatSection') as HTMLElement;
    element.style.height = 'calc(100vh - 100px)';
    element.style.top = '83px';
    element.style.position = 'absolute';
    element.style.zIndex = '1';
  }

  //for Chat Room Mobile View
  closeChat() {
    let element = document.getElementById('chatSection') as HTMLElement;
    element.style.height = '0';
    element.style.position = 'absolute';
    element.style.zIndex = '-1';

    let element1 = document.getElementById('groupList') as HTMLElement;
    element1.style.height = '100vh';
    element1.style.position = 'fixed';
    element1.style.zIndex = '1';
  }

  notifyUser() {
    this._toastMessage.message('You can not add more than 20 Chat Rooms !!');
  }

  submit() {
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    // const newData = {
    //   image: '../../assets/images/image/chat-default.png',
    //   roomName: this.chatRoomForm.controls.roomName.value,
    //   message: "You have started a new chat",
    //   participant: this.chatRoomForm.controls.participant.value,
    //   chatList: [],
    // };
    // this.roomList.unshift(newData);
    // this.selectedChatRoom = this.roomList[0];
    // this.roomList.forEach((room: any) => { room.className = "colorless-border-label" })
    // this.roomList[0].className = 'colored-border-label';
    const reqObj = {
      name: this.chatRoomForm.controls.roomName.value,
      members: this.chatRoomForm.controls.participant.value,
      description: "",
      userId: this.userId
    }
    console.log(reqObj, 'this.chatRoomForm.value');

    // this._apolloService.post('/room', reqObj, { userId: userData._id }).subscribe(objRes => {
    //   if (objRes.status == 'success') {
    //     this._toastMessage.success("Chat Room Created Successfully !!");
    // this.getRoomList();
    // this.chatRoomForm.patchValue({ participant: '', roomName: '' });
    this._socketService.createRoom(reqObj)
    // }
    // else {
    //   this._toastMessage.error(objRes.message);
    // }
    // })
  }

  filterMember(e: any) {
    let filter = e.target.value.toLowerCase();
    this.addMemberList = this.members.filter((key: any) =>
      key.viewValue.toLowerCase().startsWith(filter)
    );
  }

  addMember() {
    // this.selectedChatRoom.members = [...this.selectedChatRoom.members, ...this.selectedAddMember];
    // this._toastMessage.success('Members Added Successfully !!');
    // this.selectedAddMember = '';
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    this._apolloService.put(`/room/add-member/${this.selectedChatRoom._id}`, this.selectedAddMember, { userId: userData._id }).subscribe(async objRes => {
      if (objRes.status == 'success') {
        this._toastMessage.success(objRes.message);
        await this.getRoomList();
        this.selectedAddMember = this.roomList.find((room: any) => room._id === this.selectedChatRoom._id);
        console.log(this.selectedAddMember, 'this.selectedAddMember');
        this.selectedAddMember.className = 'colored-border-label';
        this._toastMessage.success('Member Added Successfully !!');
      }
      else {
        this._toastMessage.error(objRes.message);
      }
    });
  }

  removeMember() {
    // let length = this.selectedRemoveMember.length
    // this.selectedChatRoom.members.forEach((member: any, index: number) => {
    //   if (this.selectedRemoveMember.indexOf(member) != -1) {
    //     this.selectedChatRoom.members.splice(index, length)
    //   }
    // })
    // this.selectedRemoveMember = '';
  }

  deleteChatRoom() {
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    console.log(this.selectedChatRoom, 'this.selectedChatRoom', this.selectedChatRoom._id, userData._id);
    this._apolloService.delete(`/room/${this.selectedChatRoom._id}`, { userId: userData._id }).subscribe(objRes => {
      if (objRes.status == 'success') {
        this._toastMessage.success("Chat Room Deleted Successfully !!");
        this.getRoomList();
      }
      else {
        this._toastMessage.error("You are not the owner of this Room !!");
      }
    })
  }

  // Scroll to the bottom of the chat area
  scrollToBottom() {
    if (this.scrollbar) {
      // Use the NgScrollbar API's scrollTo method
      this.scrollbar.scrollTo({ top: this.scrollbar.nativeElement.scrollHeight, duration: 150 });
    }
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.roomSubscription.unsubscribe();
  }
}
