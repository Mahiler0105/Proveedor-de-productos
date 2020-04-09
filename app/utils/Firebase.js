import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyA8VD6gIc6w0A-rocyYRYymOeibZxWYGLc",
  authDomain: "lrtbl-6858b.firebaseapp.com",
  databaseURL: "https://lrtbl-6858b.firebaseio.com",
  projectId: "lrtbl-6858b",
  storageBucket: "lrtbl-6858b.appspot.com",
  messagingSenderId: "579000212869",
  appId: "1:579000212869:web:1654fe81ba68a8b17238ec",
  measurementId: "G-K4BWEP9T0R",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
