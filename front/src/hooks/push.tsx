// import { useEffect } from "react";
// import * as firebaseApp from "firebase/app";
// import * as firebaseMessage from "firebase/messaging";

// export default function Push() {
//   const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FCM_API_KEY,
//     authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FCM_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FCM_APP_ID,
//     measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
//   };
//   useEffect(() => {
//     firebaseApp.initializeApp(firebaseConfig);

//     const messaging = firebaseMessage.getMessaging();

//     firebaseMessage
//       .getToken(messaging, {
//         vapidKey: process.env.REACT_APP_VAPID_KEY,
//       })
//       .then((currentToken) => {
//         if (currentToken) {
//           console.log(currentToken);
//           alert("토큰: " + currentToken);
//           // 토큰을 서버에 전달...
//         } else {
//           // Show permission request UI
//           console.log(
//             "No registration token available. Request permission to generate one."
//           );
//         }
//       })
//       .catch((err) => {
//         console.log("An error occurred while retrieving token. ", err);
//         // ...
//       });
//   }, []);
//   return <div></div>;
// }

import React from "react";

function push() {
  return <div></div>;
}

export default push;
