import { InsertInvitation } from "@material-ui/icons";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyByc22PUzNacLF_O8Oux_sCJBqYHzA0Yig",
  authDomain: "resolute-assignment-f61d1.firebaseapp.com",
  databaseURL: "https://resolute-assignment-f61d1.firebaseio.com",
  projectId: "resolute-assignment-f61d1",
  storageBucket: "resolute-assignment-f61d1.appspot.com",
  messagingSenderId: "380884691332",
  appId: "1:380884691332:web:75eb5e334801b3ab91d5d1",
  measurementId: "G-3GKXG4R1VQ",
};

const fireBaseInstance = firebase.initializeApp(firebaseConfig);

export const db = fireBaseInstance.firestore();
