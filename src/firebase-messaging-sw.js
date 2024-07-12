// Import the functions you need from the SDKs you need
importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCYvuCGJu-xOPEEBjg-cFO0WbGgbI6ji_4",
    authDomain: "vidhik-3aa19.firebaseapp.com",
    projectId: "vidhik-3aa19",
    storageBucket: "vidhik-3aa19.appspot.com",
    messagingSenderId: "735661313546",
    appId: "1:735661313546:web:aba7a9ed39771b349599f3",
    measurementId: "G-FYWM2J8GPM"
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//     console.log('Received background message ', payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: '/firebase-logo.png'
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });