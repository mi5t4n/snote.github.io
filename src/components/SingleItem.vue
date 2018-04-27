<template>
  <div>
      <md-list-item>
        <!-- <md-avatar>
          <img src="https://placeimg.com/40/40/people/1" alt="People">
        </md-avatar> -->
        <md-icon>
          fiber_manual_record
        </md-icon>

        <div class="md-list-item-text">
          <span><h4> {{ title }} </h4></span>
          <p><slot></slot></p>
        </div>

      <md-menu>
        <md-button md-menu-trigger class="md-icon-button md-list-action">
          <md-icon>menu</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item><md-button><md-icon>edit</md-icon></md-button></md-menu-item>
          <md-menu-item><md-button><md-icon>delete</md-icon></md-button></md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-list-item>


  </div>
</template>

<script>
export default {
  name: 'SingleItem',
  props: ['title']
}
</script>

<style scoped>

</style>
