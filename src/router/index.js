import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store'
// Import Vue Components
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import PasswordReset from '../components/PasswordReset.vue'
import Home from '../components/Home.vue'
import Default from '../components/Default.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default',
      component: Default
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: (to,from,next) => {
        if (store.getters.user == null) next('/'); else next();
      }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/passwordreset',
      name: 'PasswordReset',
      component: PasswordReset
    },
    {
      path: '*',
      name: 'ErrorPage',
      component: { template: '<h1>Page Not Found !!!</h1>' }
    }
  ]
});
