import { Component, ViewChild } from '@angular/core';
import { ApolloService } from '../shared/services/apollo.service';
import { ToastMessageService } from '../shared/services/snack-alert.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {

  newsList: any = [
    // {
    //   image: '../../assets/images/image/news_feed1.jpg',
    //   heading: '10 Essential Strategies for Business Growth',
    //   description: 'Since advertisements come in different shapes and sizes, an average viewer gets Since advertisements come in different shapes and sizes, an average viewer gets..',
    // }
  ];
  selectedIndex: any;

  constructor(private _apolloService: ApolloService, private _toastMessage: ToastMessageService) {
    this.getNewsFeed();
  }

  scrolled(e: any) {
    console.log(e,'scrolled')
    let pos = e.target.scrollTop + e.target.clientHeight;
    let max = e.target.scrollHeight;
    if (pos >= max) {
      this.onBottomReached(e);
    }
  }

  getHeadingLength(): number {
    return (window.innerWidth > 1199) ? 90 : 30;
  }

  getCharLength(): number {
    return (window.innerWidth > 1199) ? 160 : 90;
  }

  getNewsFeed() {
    this._apolloService.get('/news').subscribe(data => {
      if (data.status == 'success') {
        this.newsList = data.data.items;

      }
    })
  }

  tabSelectionChange(e: any) {
    console.log(e);
  }

  timeAgo(dateString: Date) {
    const date: any = new Date(dateString);
    const now: any = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * 60;
    const secondsInDay = 24 * 60 * 60;

    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} days ago`;
    }
  }

  onBottomReached(e: any) {
    console.log(e,'Bottom Reached')
  }
}
