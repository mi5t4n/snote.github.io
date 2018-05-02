<template>
  <div>
      <md-list-item>
        <md-icon>
          fiber_manual_record
        </md-icon>

        <div class="md-list-item-text">
          <span> {{ text }}</span>
          <p><i> {{ time }} </i> </p>
        </div>

      <md-menu>
        <md-button md-menu-trigger class="md-icon-button md-list-action">
          <md-icon>menu</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item><md-button @click="$emit('edit')"><md-icon>edit</md-icon></md-button></md-menu-item>
          <md-menu-item><md-button @click="$emit('delete')"><md-icon>delete</md-icon></md-button></md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-list-item>


  </div>
</template>

<script>
export default {
  name: 'SingleItem',
  props: ['title','time','text'],
}
</script>

<style scoped>

</style>
