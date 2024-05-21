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

  constructor(private _router: Router, private _apolloService: ApolloService,
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
      console.log('Post Api Called !!');
      let userData = JSON.parse(localStorage.getItem('userData')!);
      let reqObj = {
        lawyerId: userData._id,
        title: this.post.title,
        description: this.post.description,
        likeCount: 0,
        commentCount: 0
      };
      this._apolloService.mutate(GQLConfig.addPost, reqObj).subscribe(data => {
        if (data.data != null) {
          if (data.data.postLawyerActivity.status == 200) {
            this._toastMessage.success(data.data.postLawyerActivity.message);
            this.post.title = "";
            this.post.description = "";
            setTimeout(() => { this.getActivityFeeds() }, 2000);
          }
          else {
            this._toastMessage.success(data.data.postLawyerActivity.message);
          }
        }
      })
    }
  }

  getActivityFeeds() {
    console.log('Get Api Called !!');
    this._apolloService.query(GQLConfig.getActivityFeed).subscribe(data => {
      if (data.data != null) {
        console.log(data.data)
        if (data.data.getpostList.status == 200) {
          this.feedList = data.data.getpostList.data.postList;
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

  likePost(post: any) {
    console.log('Like Api Called !!');
    const userData: any = localStorage.getItem('userData');
    let userId = JSON.parse(userData)._id;
    let data = {
      postId: post._id,
      isLiked: !post.isLiked,
      userId: userId
    }
    this._apolloService.mutate(GQLConfig.likeUnlikePost, data).subscribe(data => {
      if (data.data != null) {
        if (data.data.postLike.status == 200) {
          this._toastMessage.success(data.data.postLike.message);
          this.getActivityFeeds();
        }
        else {
          this._toastMessage.error(data.data.postLike.message);
        }
      }
    })
  }
}
