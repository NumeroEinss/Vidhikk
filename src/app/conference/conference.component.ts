import { Component } from '@angular/core';


@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrl: './conference.component.scss'
})
export class ConferenceComponent  {
message: string = '';

chatList = [
  {
    type: 'sender',
    name: 'luvkush Mishra',
    time: '05:32 pm',
    message: 'Hey! how are you?',
    senderImage: '../../assets/images/image/add_member2.png',
  },
  {
    type: 'receiver',
    name: 'Anurag Goyal',
    time: '05:32 pm',
    message: 'I am fine...',
    receiverImage: '../../assets/images/image/anurag_goyal.jpg',
  },
  {
    type: 'receiver',
    name: 'Anurag Goyal',
    time: '05:33 pm',
    message: 'What about you..?',
    receiverImage: '../../assets/images/image/anurag_goyal.jpg',
  },
  {
    type: 'sender',
    name: 'luvkush Mishra',
    time: '05:35 pm',
    message:
      'I am also good. I saw your ad in this coat',
    senderImage: '../../assets/images/image/add_member2.png',
  },
  {
    type: 'sender',
    name: 'luvkush Mishra',
    time: '05:35 pm',
    message:
      ' Yeah, Sure!!',
    senderImage: '../../assets/images/image/add_member2.png',
  },
];

 constructor(){}

 ngAfterViewInit(){
  let el = document.getElementById("conference") as HTMLElement;
  el.click(); 
 }

 isChatOpen(){
  let element = document.getElementById("myForm") as HTMLElement;
    element.style.display = "block";
    // element.style.transition = "10s";
 }

 isChatClose(){
  let element = document.getElementById("myForm") as HTMLElement;
  element.style.display = "none"
 }

 addMessage(){
  const newMessage = {
    type:'sender',
    name:'Luvkush Mishra',
    time:new Date().toLocaleTimeString([], {
      hour:'2-digit',
      minute:'2-digit',
    }),
    message: this.message,
    senderImage:'../../assets/images/image/add_member2.png'
  };
  this.chatList.push(newMessage);
  this.message = '';
  let element1 = document.getElementById('chat-textarea') as HTMLElement;
  element1.scrollTo(0,1000);
 }
}
