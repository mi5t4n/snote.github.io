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
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <router-link to='/signin'>
            <md-list-item @click="menuVisible = !menuVisible">
              <md-icon>send</md-icon>
              <span class="md-list-item-text">Sign In</span>
            </md-list-item>
          </router-link>

          <router-link to='/signup'>
            <md-list-item @click="menuVisible = !menuVisible">              
                <md-icon>delete</md-icon>
                <span class="md-list-item-text">Sign Up</span>
            </md-list-item>
          </router-link>

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
export default {
  name: 'Reveal',
  data: () => ({
    menuVisible: false
  })
}
</script>