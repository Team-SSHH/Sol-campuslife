// self.addEventListener("install", function (e) {
//   self.skipWaiting();
// });

// self.addEventListener("activate", function (e) {
//   console.log("fcm sw activate..");
// });

// self.addEventListener("push", function (e) {
//   if (!e.data.json()) return;

//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;

//   const notificationOptions = {
//     body: resultData.body,
//   };

//   console.log(resultData.title, {
//     body: resultData.body,
//   });

//   e.waitUntil(
//     self.registration.showNotification(notificationTitle, notificationOptions)
//   );
// });

// self.addEventListener("notificationclick", function (event) {
//   const url = "/";
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });

importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyDufkEwo64LRMB-mnoaFF4ZR4mnCd_AtBQ",
  authDomain: "tutice-c8751.firebaseapp.com",
  projectId: "tutice-c8751",
  storageBucket: "tutice-c8751.appspot.com",
  messagingSenderId: "764228098486",
  appId: "1:764228098486:web:08dcc6f925daaec2c38917",
  measurementId: "G-VDVC706LKK",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // 알림 닫기

  var clickAction = event.notification.data.click_action;

  if (clickAction === "OPEN_MAIN_PAGE") {
    // OPEN_MAIN_PAGE 값인 경우 Main 페이지로 이동
    event.waitUntil(
      clients.openWindow("/") // 리액트 PWA의 Main 페이지 URL
    );
  } else if (clickAction === "OPEN_DUTCHPAY_PAGE") {
    clients.openWindow("/Alert");
  }
});

messaging.onBackgroundMessage(function (payload) {
  const notification = payload.notification;

  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    notification
  );

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: "/firebase-logo.png", // 루트 경로 기준으로 접근
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
