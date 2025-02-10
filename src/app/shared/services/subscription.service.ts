import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApolloService } from './apollo.service';
import { GQLConfig } from '../../graphql.operations';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  subscriptionplanSubject: BehaviorSubject<any> = new BehaviorSubject({});
  planList: any = [];

  constructor() {
    this.getSubscriptionDetails();
  }

  async getSubscriptionDetails() {
    if (JSON.parse(sessionStorage.getItem('userData')!) != null) {
      if (JSON.parse(sessionStorage.getItem('userData')!).userType === 'LAWYER') {
        switch (JSON.parse(sessionStorage.getItem('userData')!).activePlan) {
          case 'FREE PLAN':
            this.subscriptionplanSubject.next({ caseDiaryEnabled: false, bareActsEnabled: false, chatBoxEnabled: false });
            break;
          case 'SILVER PLAN':
            this.subscriptionplanSubject.next({ caseDiaryEnabled: false, bareActsEnabled: false, chatBoxEnabled: false });
            break;
          case 'GOLD PLAN':
            this.subscriptionplanSubject.next({ caseDiaryEnabled: true, bareActsEnabled: true, chatBoxEnabled: false });
            break;
          case 'DIAMOND PLAN':
            this.subscriptionplanSubject.next({ caseDiaryEnabled: true, bareActsEnabled: true, chatBoxEnabled: false });
            break;
          case 'PLATINUM PLAN':
            this.subscriptionplanSubject.next({ caseDiaryEnabled: true, bareActsEnabled: true, chatBoxEnabled: true });
            break;
          case 'PREMIUM MEMBERSHIP':
            this.subscriptionplanSubject.next({ caseDiaryEnabled: true, bareActsEnabled: true, chatBoxEnabled: true });
            break;
          default:
            break
        }
      }
      else if (JSON.parse(sessionStorage.getItem('userData')!).userType === 'SELLER') {
        switch (JSON.parse(sessionStorage.getItem('userData')!).activePlan) {
          case 'FREE PLAN':
            this.subscriptionplanSubject.next({ productCount: 2 });
            break;
          case 'SILVER PLAN':
            this.subscriptionplanSubject.next({ productCount: 10 });
            break;
          case 'GOLD PLAN':
            this.subscriptionplanSubject.next({ productCount: 25 });
            break;
          case 'DIAMOND PLAN':
            this.subscriptionplanSubject.next({ productCount: 50 });
            break;
          default:
            break;
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscriptionplanSubject.next({ caseDiaryEnabled: false, bareActsEnabled: false, chatBoxEnabled: false, productCount: 0 });
  }
}
