import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyD6GjQQzkD-VdRGCrpnjvS343mE8pjpzHg",
  authDomain: "milestones-200721.firebaseapp.com",
  databaseURL: "https://milestones-200721.firebaseio.com",
  projectId: "milestones-200721",
  storageBucket: "milestones-200721.appspot.com",
  messagingSenderId: "309214613246"
});

export const fireauth = firebase.auth();

export default firebase;

