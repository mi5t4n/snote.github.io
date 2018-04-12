import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import NavBar from './components/NavBar.vue'
import $ from 'jquery'
import firebase from 'firebase'

new Vue({
  el: '#app',
  render: h => h(App)
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCtTekdZj8fh7WFNdlhjrcoKiD84eiWyP0",
  authDomain: "snote-3c02e.firebaseapp.com",
  databaseURL: "https://snote-3c02e.firebaseio.com",
  projectId: "snote-3c02e",
  storageBucket: "snote-3c02e.appspot.com",
  messagingSenderId: "659464035795"
};
firebase.initializeApp(config);

