<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Sign In</div>
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
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="loading" />

        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="loading">Submit</md-button>
          &nbsp;&nbsp;<router-link to='passwordreset'>Forget password?</router-link>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="success">The {{ form.email }} is successfully signed in!!!</md-snackbar>
      <md-snackbar :md-active.sync="error.isError">{{ error.message }}</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
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
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        email: null,
        password: null
      },
      loading: false,
      error: {
        isError: false,
        message: null
      },
      success: false
    }),
    computed: {
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
        }
      }
    },
    methods: {
      ...mapActions([
        'signUserIn'
      ]),
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
      },
      saveUser () {
        this.loading = true;
       this.signUserIn({ email: this.form.email, password: this.form.password })
          .then(() => {
            this.loading = false;
            this.error = { isError: false, message: null }
            this.success = true;
            console.log('promise return')
            setTimeout(() => {
              this.$router.push('/home');
            },2000)
            
          })
          .catch((error) => {
            this.loading = false;
            this.error = { isError: false, message: error.message }
            this.success = false;
            console.log('error');
            console.log('promise error')
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