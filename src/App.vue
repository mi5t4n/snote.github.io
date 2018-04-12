<template>
  <div id="app">
    <nav-bar></nav-bar>
    <sign-up></sign-up>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SignUp from './components/SignUp.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    NavBar,
    SignUp
  }
}
</script>

<style>
</style>
