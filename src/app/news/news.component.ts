import { Component } from '@angular/core';
import { ApolloService } from '../shared/services/apollo.service';
import { SnackAlertService } from '../shared/services/snack-alert.service';
import { GQLConfig } from '../graphql.operations';

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

  constructor(private _apolloService: ApolloService, private _toastMessage: SnackAlertService) {
    this.getNewsFeed();
  }

  getHeadingLength(): number {
    return (window.innerWidth > 1199) ? 120 : 35;
  }

  getCharLength(): number {
    return (window.innerWidth > 1199) ? 160 : 90;
  }

  getNewsFeed() {
    this._apolloService.query(GQLConfig.getNewsFeed).subscribe(data => {
      if (data.data != null) {
        console.log(data.data);
        if (data.data.getNewsFeed.status == 200) {
          this._toastMessage.success(data.data.getNewsFeed.message);
          this.newsList = data.data.getNewsFeed.data.results;
        }
        else {
          this._toastMessage.error(data.data.getNewsFeed.message);
        }
      }
      console.log(data)
    })
  }
}
