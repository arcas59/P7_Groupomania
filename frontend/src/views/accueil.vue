<template>
  <div>
    <div id="bgContent">
      <div id="conteneur">
        <div id="content" col-lg-4 col-md-6 col-sm-8 col-11 mx-auto v-if="loggedIn">
          <img id="logo" src="../assets/groupomanialogo.png" class="d-inline-block align-top" alt="bug">
          <p>Vous êtes connecté sur le profil de {{ this.$store.state.pseudoUser }}</p>
          <button class="btn btn-outline-danger" @click.prevent="logout"> Se deconnecter </button>
        </div>
      </div>
    </div>
      <div id="content" col-lg-4 col-md-6 col-sm-8 col-11 mx-auto v-if="!loggedIn">
        <img id="logo" src="../assets/groupomanialogo.png" class="d-inline-block align-top" alt="bug">
        <div class="alert" :class="{'alert-danger': isAlert, 'alert-success': !isAlert}" v-if="errorMessage != ''">{{ errorMessage }}
        </div>
        <form>
          <div class="form-group" :class="{invalid: $v.pseudo.$error}">
            <label for="pseudo">Votre pseudo: </label>
            <input type="text" id="pseudo" placeholder="Votre pseudo" class="form-control" v-model="pseudo" @blur="$v.pseudo.$touch()">
            <small v-if="!$v.pseudo.minLength" class="form-text">Le nom doit contenir au moins 2 caractères</small>
            <small v-if="!$v.pseudo.syntaxe && pseudo != ''" class="form-text">Votre pseudo contient des caractères non autorisés</small>
          </div>
          <div class="form-group" :class="{invalid: $v.password.$error}">
            <label for="password">Votre mot de passe:</label>
            <input type="password" id="password" placeholder="Votre mot de passe" class="form-control" v-model="password" @blur="$v.password.$touch()">
            <small v-if="!$v.password.minLength" class="form-text">Votre password doit contenir au moins 2 caractères</small>
            <small v-if="!$v.password.syntaxe && password != ''" class="form-text">Votre mot de passe contient des caractères non autorisés</small>
          </div>
          <button class="btn btn-outline-danger" :disabled="$v.$invalid" @click.prevent="login">Se connecter</button>
        </form>
      </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {

  name: 'Home',
  data() {
    return {
      pseudo: '', 
      test: this.$ls.get('token'), 
      password: '', 
      errorMessage:'',
      token: '',
      isAlert: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLogged; 
    }, 
    isValid(){
      return this.$store.state.isValid;
    },
    tokenToCheck() {
      return this.$store.state.tokenToCheck;
    }
  },
  methods: {
    login() {
      let user = {
        pseudo: this.pseudo,
        password: this.password
      }
      axios.post('http://localhost:3000/user/login/', user)
        .then((response) => {
          this.errorMessage = response.data.message;
          this.$ls.set('token', response.data.token);
          this.$ls.set('userId', response.data.userId);
          this.$store.state.tokenToCheck = response.data.token;
          this.$store.state.userId = response.data.userId;
          this.isAlert = false;
          this.$store.dispatch('getInfos');
          this.$router.push('filactualite');
        })
        .catch(error => { 
          this.errorMessage = error.response.data.message;
          this.isAlert = true;  
          });
    },
    logout() {
    this.$ls.clear();
    this.$store.commit('LOGOUT');
    this.$store.commit('CLEAR_STATE');
    this.$router.push('');
  },
  }, 
  validations: {
    pseudo: {
      required,
      minLength: minLength(2),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
    password: {
      required,
      minLength: minLength(2),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
  }
};
</script>

<style lang="scss" scoped>

#logo 
{
  width:250px;
  height:auto;
}

form 
{
  max-width: 350px !important;
  padding: 40px 40px;
  margin: auto;
}

#content 
{
  margin-top: -50px;;
  width: 50vw;
  top: 30%;
  left: 30%;
  height:70vh;
  border: none;
  overflow-x: hidden; 
  overflow-y: hidden; 
  margin-left: -5%;
  border: none;
  overflow-x: hidden; 
  overflow-y: hidden; 
}

#conteneur {
  display:flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  width: 100%;
}

input
{
  border: none;
  text-align:center;
}

h1 
{
  margin-bottom: 3rem; 
}

#accueil 
{
  margin:auto; 
}

.invalid 
{
  input {
    border:1px solid red;
    background-color: #ffc9aa;
  }
  label {
    color:red;
  }
  small {
    color:red;
  }
}

@media all and(max-width:700px) 
{
  #content {
    width: 80vw;
    left: 16%;
    height: 70vh;
    top:20%;
    margin-top: 40px;
  }
}

</style>
