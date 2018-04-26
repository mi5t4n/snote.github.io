import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons/iconfont/material-icons.css'

// Vue Material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here
Vue.use(VueMaterial)

import * as firebase from 'firebase'

import router from './router'
import { store } from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,  
  store: store
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