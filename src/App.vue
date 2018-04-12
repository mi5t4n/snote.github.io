<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="row">
        <div class="col s12 m6">
          <!-- <sign-in></sign-in>   -->
        </div>                
        <div class="col s12 m6">
          <sign-up></sign-up>
        </div>
    </div>      
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    NavBar,
    SignUp,
    SignIn
  }
}
</script>

<style>
</style>
