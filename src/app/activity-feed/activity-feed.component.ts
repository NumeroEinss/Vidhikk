import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloService } from '../shared/services/apollo.service';
import { SnackAlertService } from '../shared/services/snack-alert.service';
import { GQLConfig } from '../graphql.operations';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss',
})
export class ActivityFeedComponent {
  isCommentBoxOpen: boolean = false;
  isPost: boolean = false;
  comment: string = '';
  userType: string = "";

  feedList: any = [];

  post: any = { title: "", description: "" };

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _apolloService: ApolloService,
    private _toastMessage: SnackAlertService
  ) {
    this.userType = _router.url.split('/')[1];
    this.getActivityFeeds();
  }

  addComment() {
    this.feedList[0].comments.push({
      name: 'Lavkush Mishra',
      location: 'Bhopal, MP',
      postDate: '2 days ago',
      comment: this.comment,
      likesCount: 'Raj and 11 others',
      commentsCount: '1 Comments',
    });
    this.comment = '';
    let element = document.getElementById('comment-section') as HTMLElement;
    element.scrollTo(0, 1000);
  }

  addPost() {
    if (this.post.title == "") {
      this._toastMessage.error("Post Title is required !!");
    }
    else if (this.post.description == "") {
      this._toastMessage.error("Post Description is required !!");
    }
    else {
      let userData = JSON.parse(localStorage.getItem('userData')!);
      let reqObj = {
        lawyerId: userData._id,
        title: this.post.title,
        description: this.post.description,
        likeCount: ""
      };
      // setTimeout(() => {
      this._apolloService.mutate(GQLConfig.addPost, reqObj).subscribe(data => {
        if (data.data != null) {
          console.log(data.data)
          if (data.data.postLawyerActivity.status == 200) {
            this._toastMessage.success(data.data.postLawyerActivity.message);
            this.post.title = "";
            this.post.description = "";
            this.getActivityFeeds();
          }
          else {
            this._toastMessage.success(data.data.postLawyerActivity.message);
          }
        }
      })
      // }, 2000)
    }
  }

  getActivityFeeds() {
    console.log('dataBefore')
    this._apolloService.query(GQLConfig.getActivityFeed).subscribe(data => {
      console.log(data, 'data')
      if (data.data != null) {
        if (data.data.getpostList.status == 200) {
          this.feedList = data.data.getpostList.data.postList;
          console.log(data.data.getpostList.data.postList);
        }
        else {
          this._toastMessage.success(data.data.getpostList.message);
        }
      }
    })
  }

  getDaysAgo(date: Date) {
    let today: Date = new Date();
    let daysAgo = Math.floor((today.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
    return daysAgo;
  }
}
