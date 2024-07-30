import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })
    .catch((error) => {
      console.error('ServiceWorker registration failed: ', error);
    });
}
