import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAIjrrqY99qlB45keuAmwMhxxdYrrEsGz4",
    authDomain: "reels-6d2bf.firebaseapp.com",
    projectId: "reels-6d2bf",
    storageBucket: "reels-6d2bf.appspot.com",
    messagingSenderId: "664450974094",
    appId: "1:664450974094:web:cd3abd56d38feccc44e4df"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage()