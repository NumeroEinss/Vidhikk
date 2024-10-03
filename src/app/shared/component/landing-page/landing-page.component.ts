import { Component, AfterViewInit } from '@angular/core';
import { ToastMessageService } from '../../services/snack-alert.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements AfterViewInit {

  constructor(private _toastMessage: ToastMessageService) {
    this._toastMessage.showLoader = true;
  }

  ngAfterViewInit() {
    this._toastMessage.showLoader = false;
  }

  location = [
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Andhra Pradesh'
    },
    {
      image: '../../../../assets/images/image/city_demo_image2.png',
      city: 'Madhya Pradesh'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Mumbai'
    },
    {
      image: '../../../../assets/images/image/city_demo_image2.png',
      city: 'Delhi'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Gujrat'
    },
    {
      image: '../../../../assets/images/image/city_demo_image2.png',
      city: 'Andhra Pradesh'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Calcutta'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Karnataka'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Calcutta'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Karnataka'
    },
  ]
}
