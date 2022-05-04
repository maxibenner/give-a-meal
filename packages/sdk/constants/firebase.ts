import { initializeApp, FirebaseApp } from "firebase/app";
import { firebaseConfig } from "./env";

var firebase: FirebaseApp | undefined;

const clientCredentials = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  measurementId: firebaseConfig.measurementId,
};

if (!firebase) {
  firebase = initializeApp(clientCredentials);
}

export { firebase };
