import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  feedList = [
    {
      name: 'Amit Sharma',
      location: 'Indore, MP',
      postDate: '4 days ago',
      heading:
        'Congratulations to Hamoya Data Science Intership Stage C Winners!',
      comment:
        'The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.',
      likesCount: 'Santosh and 2k others',
      commentsCount: '21 Comments',
      comments: [
        {
          name: 'lavkush Mishra',
          location: 'Bhopal, MP',
          postDate: '2 days ago',
          comment:
            'The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.',
          likesCount: 'Raj and 11 others',
          commentsCount: '1 Comments',
        },
        {
          name: 'lavkush Mishra',
          location: 'Bhopal, MP',
          postDate: '2 days ago',
          comment:
            'The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.',
          likesCount: 'Raj and 11 others',
          commentsCount: '1 Comments',
        },
      ],
    },
    {
      name: 'Amit Sharma',
      location: 'Indore, MP',
      postDate: '4 days ago',
      heading:
        'Congratulations to Hamoya Data Science Intership Stage C Winners!',
      comment:
        'The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.',
      likesCount: 'Santosh and 2k others',
      commentsCount: '21 Comments',
      comments: [
        {
          name: 'lavkush Mishra',
          location: 'Bhopal, MP',
          postDate: '2 days ago',
          comment:
            'The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.',
          likesCount: 'Raj and 11 others',
          commentsCount: '1 Comments',
        },
        {
          name: 'lavkush Mishra',
          location: 'Bhopal, MP',
          postDate: '2 days ago',
          comment:
            'The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.The collapse of the online-advertising market in 2001 made marketing on the Internet seem even less compelling. Website usability, press releases.',
          likesCount: 'Raj and 11 others',
          commentsCount: '1 Comments',
        },
      ],
    },
  ];

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.userType = _router.url.split('/')[1];
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

}
