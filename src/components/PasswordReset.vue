<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Password Reset</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
              </md-field>              
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="sending">Submit</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The {{ form.email }} is successfully signed in!!!</md-snackbar>
      <md-snackbar :md-active.sync="isFirebaseResult">{{firebaseResult}}</md-snackbar>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        email: null
      },
      firebaseResult: null,
      isFirebaseResult: false,
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        email: {
          required,
          email
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.email = null
      },
      saveUser () {
        this.sending = true
        var vm = this;

        console.log('signin');
        if (firebase.auth().currentUser) {        
          firebase.auth().signOut()  
        }

        firebase.auth().sendPasswordResetEmail(this.form.email).then(function() {
          vm.sending = false;
          vm.isFirebaseResult = true;
          vm.firebaseResult = 'Check your email for reseting your password.';       
        }).catch(function(error) {
          vm.sending = false;
          vm.isFirebaseResult = true;
          vm.firebaseResult = error.message;
        });
        
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>