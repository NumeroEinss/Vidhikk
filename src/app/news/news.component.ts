import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  newsList = [
    {
      image: '../../assets/images/image/news_feed1.jpg',
      heading: '10 Essential Strategies for Business Growth',
      description: 'Since advertisements come in different shapes and sizes, an average viewer gets..Since advertisements come in different shapes and sizes, an average viewer gets..',
    },
    {
      image: '../../assets/images/image/news_feed3.jpg',
      heading: 'Unlocking Data Analytics: Practical Tips and Techniques',
      description: 'Since advertisements come in different shapes and sizes, an average viewer gets..Since advertisements come in different shapes and sizes, an average viewer gets..',
    },
    {
      image: '../../assets/images/image/news_feed1.jpg',
      heading: 'Webinar: The Future of Digital Transformation in Business',
      description: 'Since advertisements come in different shapes and sizes, an average viewer gets..Since advertisements come in different shapes and sizes, an average viewer gets..',
    },
    {
      image: '../../assets/images/image/news_feed3.jpg',
      heading: 'Case Study: How TechVantage Transformed Company ABC&nbsp quotes Workflow',
      description: 'Since advertisements come in different shapes and sizes, an average viewer gets..Since advertisements come in different shapes and sizes, an average viewer gets..',
    },

  ]
}
