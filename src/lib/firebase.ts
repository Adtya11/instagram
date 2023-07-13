import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {

  apiKey: 'AIzaSyBv43h_SKan6TFJX7-D5d-vz8weQq9X8DU',

  authDomain: 'instagram-78599.firebaseapp.com',

  projectId: 'instagram-78599',

  storageBucket: 'instagram-78599.appspot.com',

  messagingSenderId: '754017593473',

  appId: '1:754017593473:web:4390d04ba95c85f7578580'

};

const firebaseApp = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebaseApp, FieldValue };
