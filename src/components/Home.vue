<template>
  <div>
    <md-list>
      <single-item v-for="(note,index) in loadedNotes" v-bind:key="note.id" 
        v-bind:time="note.timestamp | humanReadble" v-bind:text = "note.text"
        @delete="deleteNote(index, note.id)" @edit="editNote(index,note.id, note.text)" />
    </md-list>

    <md-dialog-confirm
      :md-active.sync="delete_active"
      md-title="Do you want to delete post?"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="onDeleteCancel"
      @md-confirm="onDeleteConfirm" />

    <md-dialog-prompt
      :md-active.sync="edit_active"
      v-model="text"
      md-title="Edit note"
      md-input-maxlength="160"
      md-input-placeholder=""
      md-confirm-text="Done"
      @md-confirm="onEditConfirm"
      @md-cancel="onEditCancel" />

    <md-snackbar :md-active.sync="delete_alert">Your post has been deleted!</md-snackbar>
    <md-snackbar :md-active.sync="edit_alert">Your post has been edited!</md-snackbar>
    <md-snackbar :md-active.sync="error.isError">{{ error.message }}</md-snackbar>
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
      loading: false,
      error: {
        isError: false,
        message: null
      },
      text: '',
      id: null,
      index: null,
      success: false,
      edit_alert: false,
      edit_active: false,
      delete_alert: false,
      delete_active: false
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
    deleteNote(index,id){
      this.delete_active = true;
      this.index = index;
      this.id = id;
    },
    onDeleteConfirm(){
      this.delete_alert = false;
      this.$store.dispatch('deleteNote',this.id)
      .then(() => {
        this.$store.state.loadedNotes.splice(this.index,1);
        this.delete_alert =  true;
      }).catch((error) => {
        console.log(error);
        this.error = {isError: true, message: error.message}
      });;
    },
    onDeleteCancel(){
      this.index = null,
      this.id = null
    },
    editNote(index,id,text){
      this.edit_active = true;
      this.id = id;
      this.index = index;
      this.text =  text;
    },
    onEditConfirm(){
      this.edit_alert = false;
      const post = {
        id: this.id,
        text: this.text,
        timestamp: moment().valueOf()
      }
      this.$store.dispatch('editNote',post)
      .then(() => {
        this.$store.state.loadedNotes[this.index] = {
          id: this.id,
          text: this.text,
          timestamp: this.timestamp
        }
        this.edit_alert =  true;
      }).catch((error) => {
        console.log(error);
        this.error = {isError: true, message: error.message}
      });;
    },
    onEditCancel(){
      this.text = '';
      this.id = null;
      this.index = null;
    }
  },
  filters: {
    humanReadble : function(value){
      let timestamp = moment(value);
      let text = timestamp.from(moment().valueOf());
      return text;
    }
  }
}
</script>

<style scoped>

</style>

