<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Sign Up</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="loading" />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
              </md-field>

              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" v-model="form.password" :disabled="loading" />
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">The password length must be minimum 6 characters</span>
              </md-field>
              
              <md-field :class="getValidationClass('confirmPassword')">
                <label for="confirmPassword">Confirm Password</label>
                <md-input type="password" id="confirmPassword" v-model="form.confirmPassword" :disabled="loading" />
                <span class="md-error" v-if="!$v.form.confirmPassword.required">Password did not match</span>
                <span class="md-error" v-else-if="!$v.form.confirmPassword.minlength">Password did not match</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="loading" />

        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="loading">Submit</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The {{ form.email }} was created successfully !!!</md-snackbar>
      <md-snackbar :md-active.sync="error.isError">{{ error.message }}</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as firebase from 'firebase'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'SignUp',
    mixins: [validationMixin],
    data: () => ({
      form: {
        email: null,
        password: null,
        confirmPassword:null
      },
    }),
    computed: {
      ...mapGetters([
        'loading',
        'error',
        'userSaved'
      ]),
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        },
        confirmPassword: {
          sameAsPassword: sameAs('password')
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
        this.form.password = null
        this.form.confirmPassword = null
      },
      saveUser () {
        this.$store.dispatch('signUserUp', { email: this.form.email, password: this.form.password });
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