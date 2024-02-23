import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss',
})
export class ActivityFeedComponent implements AfterViewInit {
  isCommentBoxOpen: boolean = false;
  isPost: boolean = false;
  opacityStyling = { opacity: 0.1 };

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
  comment: string = '';

  constructor() {}

  ngAfterViewInit() {
    let element = document.getElementById('modalButton') as HTMLElement;
    element.click();
  }

  addComment() {
    this.feedList[0].comments.push({
      name: 'lavkush Mishra',
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
