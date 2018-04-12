<template>
  <div id="SignIn">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            <div class="input-field">
              <input id="email" type="text" class="validate" v-bind:='email'>
              <label for="email">Email</label>
            </div>
            <div class="input-field">
              <input id="password" type="password" class="validate" v-bind='password'>
              <label for="email">Password</label>
            </div>
            <button class="waves-effect waves-light btn">Log In</button>
            <button class="waves-effect waves-light btn">Sign Up</button>
          </div>                        
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
      return {
          email: '',
          password: ''
      }
  },
  methods: {
      signin: function (){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log('errorCode = ' + errorCode);
                console.log('errorMessage = ' + errorMessage);
            });

            firebase.auth().currentUser.sendEmailVerification().then(function() {
                console.log('Email verification sent !!!');
            });
      }
  }
}
</script>

<style scoped>

</style>
