import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIkMOYkqqxdFfaWShFyVofv3euukpT1_s",
    authDomain: "bt3103-week-6-193fb.firebaseapp.com",
    projectId: "bt3103-week-6-193fb",
    storageBucket: "bt3103-week-6-193fb.appspot.com",
    messagingSenderId: "1007816561377",
    appId: "1:1007816561377:web:e4b13843fb9cf76fdcdda0",
    measurementId: "G-SHRDG32FBQ"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;