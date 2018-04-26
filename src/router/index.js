import Vue from 'vue'
import Router from 'vue-router'
// Import Vue Components
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import PasswordReset from '../components/PasswordReset.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default',
      component: SignIn
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
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
    // {
    //   path: '*',
    //   name: 'ErrorPage',
    //   component: { template: '<h1>Page Not Found</h1>' }
    // }
  ],
  mode: 'history'
});
