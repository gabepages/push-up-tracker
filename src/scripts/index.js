//NPM Imports
import React from 'react';
import { render } from "react-dom";

import '../styles/app.scss';

//Local File Imports
import App from './components/App.jsx';

// Initialize Firebase
var config = {
 apiKey: "AIzaSyBODxoQGXMZDXKgtae5KjKEL3sVLo5ooLQ",
 authDomain: "push-up-tracker.firebaseapp.com",
 databaseURL: "https://push-up-tracker.firebaseio.com",
 storageBucket: "push-up-tracker.appspot.com",
 messagingSenderId: "21535802496"
};
firebase.initializeApp(config);

render(
  <App firebase={firebase} />,
  document.getElementById('app')
);
