import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import $ from 'jquery'
import firebase from 'firebase'

//import vue components
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'

Vue.use(VueRouter); 

const router = new VueRouter({
  routes: [
    {path:'', component: SignIn},
    {path:'/signin', component: SignIn},
    {path: '/signup', component: SignUp}
  ]
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,  
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