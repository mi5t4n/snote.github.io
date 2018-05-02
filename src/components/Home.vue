<template>
  <div>
    <md-list>
      <single-item v-for="note in loadedNotes" v-bind:key="note.id" v-bind:time="note.timestamp | humanReadble" v-bind:text = "note.text" />
    </md-list>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SingleItem from './SingleItem.vue'
import moment from 'moment'

export default {
  name: 'Home',
  components: {
    SingleItem
  },
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters([
      'loadedNotes'
    ])
  },
  methods: {
    ...mapActions([
      'loadNotes'
    ]),
  },
  filters: {
    humanReadble : function(value){
      let timestamp = moment(value);
      // let text = moment().subtract(timestamp).milliseconds();
      let text = timestamp.from(moment().valueOf());
      return text;
    }
  }
}
</script>

<style scoped>

</style>

