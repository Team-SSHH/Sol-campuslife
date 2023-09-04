// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDufkEwo64LRMB-mnoaFF4ZR4mnCd_AtBQ",
  authDomain: "tutice-c8751.firebaseapp.com",
  projectId: "tutice-c8751",
  storageBucket: "tutice-c8751.appspot.com",
  messagingSenderId: "764228098486",
  appId: "1:764228098486:web:08dcc6f925daaec2c38917",
  measurementId: "G-VDVC706LKK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);
