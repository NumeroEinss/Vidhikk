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
  pageSize: number = 10;
  currentPage: number = 1;
  recordCount: number = 0;

  currentPageLegal: number = 1;
  recordCountLegal: number = 0;
  pageSizeLegal: number = 10;
  newsListLegal: any = [];

  constructor(private _apolloService: ApolloService, private _toastMessage: ToastMessageService) {
    this.getNewsFeed(1);
    this.getLegalNews(1);
  }

  scrolled(e: any) {
    let pos = e.target.scrollTop + e.target.clientHeight;
    let max = e.target.scrollHeight;
    if (pos >= max) {
      this.onBottomReached(e);
    }
  }

  getHeadingLength(): number {
    return (window.innerWidth > 1199) ? 90 : 50;
  }

  getCharLength(): number {
    return (window.innerWidth > 1199) ? 200 : 90;
  }

  getNewsFeed(page: number) {
    this._apolloService.get(`/news/latest?page=${page}&pageSize=${this.pageSize}`).subscribe(data => {
      if (data.status == 'success') {
        this.newsList = data.data.items;
        this.recordCount = data.data.totalCount;
      }
    })
  }

  tabSelectionChange(e: any) {
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
    console.log(e, 'Bottom Reached')
  }

  nextPage(): void {
    let val = this.currentPage += 1;
    this.getNewsFeed(val);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      let val = this.currentPage -= 1;
      this.getNewsFeed(val);
    }
  }

  getLegalNews(page: number) {
    this._apolloService.get(`/news?page=${page}&pageSize=${this.pageSizeLegal}`).subscribe(data => {
      if (data.status == 'success') {
        this.newsListLegal = data.data.items;
        this.recordCountLegal = data.data.totalCount;
      }
    })
  }

  previousPageLegal() {
    if (this.currentPageLegal > 1) {
      let val = this.currentPageLegal -= 1;
      this.getLegalNews(val);
    }
  }

  nextPageLegal() {
    let val = this.currentPageLegal += 1;
    this.getLegalNews(val);
  }

  getNewsUrl(news: any): string {
    if (news.link.startsWith('/')) {
      return 'https://' + news.source.replace('_', '') + '.com' + news.link;
    }
    else {
      return news.link;
    }
  }

  goToPageEvent(type: string, e: any) {
    switch (type) {
      case 'Latest':
        this.currentPage = e;
        this.getNewsFeed(this.currentPage);
        break;
      case 'Legal':
        this.currentPageLegal = e;
        this.getLegalNews(this.currentPageLegal);
        break;
    }
  }
}
