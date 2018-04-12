  <template>
    <div id="SignUp">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            <div class="input-field">
              <input id="email" type="text" class="validate" v-model='email'>
              <label for="email">Email</label>
            </div>
            <div class="input-field">
              <input id="password" type="password" class="validate" v-model='password'>
              <label for="email">Password</label>
            </div>
            <div class="input-field">
              <input id="retype-password" type="password" class="validate" v-model='retypePassword'>
              <label for="email">Retype Password</label>
            </div>                           
            <button @click='signup' class="waves-effect waves-light btn">Sign Up</button>
          </div>                        
        </div>
      </div>
    </div>
  </template>

  <script>
  import firebase from 'firebase';

  export default {
  name: 'SignUp',
  data(){
      return {
          email: '',
          password: '',
          retypePassword:''
      }
  },
  methods: {
      signup: function(){
          console.log('signup');
          if (this.retypePassword != this.password) {
              console.log('Password mismatch');
              return;
          }
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log('errorCode = ' + errorCode);
                console.log('errorMessage = ' + errorMessage);

                // if (errorCode == null){
                    
                // }
            // ...
            });
      }
  }
  }
  </script>

  <style scoped>

  </style>
