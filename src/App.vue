<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">SNOTE</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>

          <router-link to='/home'>
            <md-list-item @click="menuVisible = !menuVisible">
              <md-icon>move_to_inbox</md-icon>
              <span class="md-list-item-text">Home</span>
            </md-list-item>
          </router-link>

          <router-link to='/signin' v-if="isUserLoggedIn == false">
            <md-list-item @click="menuVisible = !menuVisible">
              <md-icon>send</md-icon>
              <span class="md-list-item-text">Sign In</span>
            </md-list-item>
          </router-link>

          <router-link to='/signup' v-if="isUserLoggedIn == false">
            <md-list-item @click="menuVisible = !menuVisible">              
                <md-icon>delete</md-icon>
                <span class="md-list-item-text">Sign Up</span>
            </md-list-item>
          </router-link>

          
          <md-list-item @click="userLogOut()" v-if="isUserLoggedIn == true">              
              <md-icon>delete</md-icon>
              <span class="md-list-item-text">Logout</span>
          </md-list-item>

          <md-list-item @click="menuVisible = !menuVisible">
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Credits</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
    
    <md-snackbar :md-active.sync="isUserLoggedIn">Logged in successfully !!!</md-snackbar>
    <md-snackbar :md-active.sync="success">Logged out successfully !!!</md-snackbar>
    <md-snackbar :md-active.sync="error.isError">{{ error.message }}</md-snackbar>

    <md-dialog-prompt
      :md-active.sync="active"
      v-model="value"
      md-title="Write note"
      md-input-maxlength="160"
      md-input-placeholder=""
      md-confirm-text="Done" v-on:md-confirm="addNote(value)" />
    <md-button class="md-fab md-primary md-fab-bottom-right md-fixed" v-if="isUserLoggedIn == true" @click="active = true">
      <md-icon>edit</md-icon>
    </md-button>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    height: 500px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'App',
  data: () => ({
    menuVisible: false,
    loading: false,
    error: {
      isError: false,
      message: null
    },
    success: false,
    active: false,
    value: null
  }),
  computed: {
    ...mapGetters([
      'isUserLoggedIn'
    ]),
    menuItems(){
      let menuItems = [
        {icon: 'move_to_inbox', title: 'Home', link: '/' },
        {icon: 'send', title: 'Sign In', link: '/signin' },
        {icon: 'delete', title: 'Sign Up', link: '/signup' },
        {icon: 'error', title: 'Credits', link: '/' },
      ]
    }
  },
  methods: {
    ...mapActions([
        'logout',
        'createNote'
      ]),
      addNote(value){
        if (value != '')
          this.createNote({ note: value, timestamp: moment().valueOf() })
          .then(() => {
            this.error= { isError: true, message: 'Note added successfully !!!' }
            this.value = '';
          }).catch((error) => {
            this.error= { isError: true, message: error.message }
            console.log(error);
          });
      },
      userLogOut(){
        this.loading = true;
        this.logout().then(() => {
          this.loading = false;
          this.error = { isError: false, message: null }
          this.success = true;
          this.menuVisible = !this.menuVisible

          setTimeout(() => {
            this.$router.push('/')
          },2000);
            
        }).catch((error) => {
          this.loading = false;
          this.error = { isError: true, message: error.message }
          this.success = false;
          console.log(error)
        });
      }
  }
}
</script>