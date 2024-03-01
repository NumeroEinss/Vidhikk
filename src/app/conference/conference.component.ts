import { Component, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Subscription, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrl: './conference.component.scss',
})
export class ConferenceComponent {
  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;
  message: string = '';

  chatList = [
    {
      type: 'sender',
      name: 'luvkush Mishra',
      time: '05:32 PM',
      message: 'Hey! how are you?',
      senderImage: '../../assets/images/image/add_member2.png',
    },
    {
      type: 'receiver',
      name: 'Anurag Goyal',
      time: '05:32 PM',
      message: 'I am fine...',
      receiverImage: '../../assets/images/image/anurag_goyal.jpg',
    },
    {
      type: 'receiver',
      name: 'Anurag Goyal',
      time: '05:33 PM',
      message: 'What about you..?',
      receiverImage: '../../assets/images/image/anurag_goyal.jpg',
    },
    {
      type: 'sender',
      name: 'luvkush Mishra',
      time: '05:35 PM',
      message: 'I am also good. I saw your ad in this coat',
      senderImage: '../../assets/images/image/add_member2.png',
    },
    {
      type: 'sender',
      name: 'luvkush Mishra',
      time: '05:35 PM',
      message: ' Yeah, Sure!!',
      senderImage: '../../assets/images/image/add_member2.png',
    },
  ];

  timer: number = 61;
  timeInSecond: number = this.timer * 60;
  pause: boolean = true;
  source = interval(60000);
  subscription: Subscription;

  constructor() {
    this.subscription = this.source.subscribe(() => this.decreaseTimer());
  }

  ngAfterViewInit() {
    console.log(this.countdown, 'dfafsjkl;faldjk;s');
    let el = document.getElementById('conference') as HTMLElement;
    el.click();
    let degree = this.timer * 6; //Converting minutes to degrees 360 deg / 60 mins
    let elem = document.getElementById('timer') as HTMLElement;
    let color = '#2e5bff';
    let color2 = '#ededed';
    if (this.timer > 60) {
      this.countdown.config.format = 'HH:mm:ss';
      color = 'rgb(164,24,84)';
      color2 = '#2e5bff';
      degree = degree - 360;
    }
    elem.style.background = `conic-gradient(${color} ${degree}deg,${color2} 0deg)`;
  }

  decreaseTimer() {
    if (this.timer > 0) this.timer--;
    console.log(this.timer, this.countdown);
    let degree = this.timer * 6; //Converting minutes to degrees 360 deg / 60 mins
    let color = '#2e5bff';
    let color2 = '#ededed';
    this.countdown.config.format = 'mm:ss';
    if (degree > 360) {
      this.countdown.config.format = 'HH:mm:ss';
      color = 'rgb(164,24,84)';
      color2 = '#2e5bff';
    }
    console.log(degree);
    let elem = document.getElementById('timer') as HTMLElement;
    elem.style.background = `conic-gradient(${color} ${degree}deg,${color2} 0deg)`;
  }

  isChatOpen() {
    let element = document.getElementById('myForm') as HTMLElement;
    element.style.display = 'block';
  }

  isChatClose() {
    let element = document.getElementById('myForm') as HTMLElement;
    element.style.display = 'none';
  }

  addMessage() {
    const newMessage = {
      type: 'sender',
      name: 'Luvkush Mishra',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      message: this.message,
      senderImage: '../../assets/images/image/add_member2.png',
    };
    this.chatList.push(newMessage);
    this.message = '';
    // let element1 = document.getElementById('chat-textarea') as HTMLElement;
    // element1.scrollTo(0, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
