import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const config = {
  apiKey: "AIzaSyDufkEwo64LRMB-mnoaFF4ZR4mnCd_AtBQ",
  authDomain: "tutice-c8751.firebaseapp.com",
  projectId: "tutice-c8751",
  storageBucket: "tutice-c8751.appspot.com",
  messagingSenderId: "764228098486",
  appId: "1:764228098486:web:08dcc6f925daaec2c38917",
  measurementId: "G-VDVC706LKK",
};

const app = initializeApp(config);
const messaging = getMessaging();

//토큰값 얻기
getToken(messaging, {
  vapidKey: "프로젝트설정 > 클라우드메시징 > 웹 구성의 웹푸시인증서 발급",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

//포그라운드 메시지 수신
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});
