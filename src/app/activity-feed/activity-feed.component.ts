import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloService } from '../shared/services/apollo.service';
import { ToastMessageService } from '../shared/services/snack-alert.service';
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
  refreshVisible: boolean = false;

  constructor(private _router: Router, private _apolloService: ApolloService,
    private _toastMessage: ToastMessageService
  ) {
    this.userType = _router.url.split('/')[1];
    this.getActivityFeeds();
    setInterval(() => { this.refreshVisible = true }, 10000)
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
        likeCount: 0,
        commentCount: 0
      };
      this._apolloService.mutate(GQLConfig.addPost, reqObj).subscribe(data => {
        if (data.data != null) {
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
    }
  }

  getActivityFeeds() {
    this._apolloService.mutate(GQLConfig.getActivityFeed).subscribe(data => {
      if (data.data != null) {
        if (data.data.getpostList.status == 200) {
          this.feedList = data.data.getpostList.data.postList;
          this.feedList.forEach((x: any) => { x.isCommentExpanded = false; x.comment = ""; });
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
    return daysAgo > 0 ? daysAgo : daysAgo * (-1);
  }

  likePost(post: any) {
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

  addComment(post: any) {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    if (post.comment == "") {
      this._toastMessage.error('Comment is required !!');
    }
    else {
      let reqObj = {
        postId: post._id,
        lawyerId: parsedData._id,
        comment: post.comment
      }
      this._apolloService.mutate(GQLConfig.sendComment, reqObj).subscribe(data => {
        if (data.data != null) {
          if (data.data.postComment.status == 200) {
            this._toastMessage.success(data.data.postComment.message);
            this.getPostComment(post);
          }
          else {
            this._toastMessage.error(data.data.postComment.message);
          }
        }
      })
    }
  }

  openCommentBox(post: any) {
    post.isCommentExpanded = !post.isCommentExpanded;
  }

  getPostComment(post: any) {
    this._apolloService.mutate(GQLConfig.getPostComment, { postId: post._id }).subscribe(data => {
      if (data.data != null) {
        if (data.data.getPostComment.status == 200) {
          post.comments = data.data.getPostComment.data.commentList;
          post.comment = "";
        }
        else {
          this._toastMessage.error(data.data.getPostComment.message);
        }
      }
    })
  }
}
