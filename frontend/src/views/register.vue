<template>
  <div>
    <div id="bgContent">
    </div>
    <div id="content">
      <h1> Créez votre compte </h1>
      <form>
        <div class="alert" :class="{'alert-danger': isAlert, 'alert-success': !isAlert}" v-if="errorMessage != ''">{{ errorMessage }}
        </div>
        <div class="form-group" :class="{invalid:$v.nomUtilisateur.$error}">
          <label for="nomUtilisateur">Pseudo :</label> <br>
          <input type="text" placeholder="Nom d'utilisateur" id="nomUtilisateur" class="form-control" v-model="nomUtilisateur" @blur="$v.nomUtilisateur.$touch()">
          <small v-if="!$v.nomUtilisateur.minLength" id="emailHelp" class="form-text">Le nom d'utilisateur doit contenir au moins 2 caractères</small>
          <small v-if="!$v.nomUtilisateur.syntaxe && nomUtilisateur != ''" id="emailHelp" class="form-text">Le nom d'utilisateur contient des caractères non autorisés</small>
        </div>
        <div class="form-group" :class="{invalid:$v.nom.$error}">
          <label for="nom">Nom :</label> <br>
          <input type="text" placeholder="Nom" id="nom" class="form-control" v-model="nom" @blur="$v.nom.$touch()">
          <small v-if="!$v.nom.minLength" id="emailHelp" class="form-text">Le nom doit contenir au moins 2 caractères</small>
          <small v-if="!$v.nom.syntaxe && nom != ''" id="nomHelp" class="form-text">Le nom contient des caractères non autorisés</small>
        </div>
        <div class="form-group" :class="{invalid:$v.prenom.$error}">
          <label for="prenom">Prénom :</label> <br>
          <input type="text" placeholder="Prénom" id="prenom" class="form-control" v-model="prenom" @blur="$v.prenom.$touch()">
          <small v-if="!$v.prenom.minLength" id="emailHelp" class="form-text">Le prénom doit contenir au moins 2 caractères</small>
          <small v-if="!$v.prenom.syntaxe && prenom != ''" id="nomHelp" class="form-text">Le prénom contient des caractères non autorisés</small>
        </div>
        <div class="form-group" :class="{invalid: $v.email.$error}">
          <label for="email">Email :</label> <br>
          <input type="email" placeholder="Adresse e-mail" id="email" class="form-control" v-model="email" @blur="$v.email.$touch()">
          <small v-if="!$v.email.email" id="emailHelp" class="form-text">L'adresse email fournie est invalide. Merci de respecter le format nom@hebergeur.extension</small>
        </div>
        <div class="form-group" :class="{invalid: $v.password.$error}">
          <label for="password">Mot de passe :</label> <br>
          <input type="password" placeholder="Mot de passe" id="password" class="form-control" v-model="password" @blur="$v.password.$touch()">
          <small v-if="!$v.password.minLength" id="emailHelp" class="form-text">Le mot de passe doit contenir au moins 2 caractères</small>
          <small v-if="!$v.password.syntaxe && password != ''" id="nomHelp" class="form-text">Le password contient des caractères non autorisés</small>
        </div>
        <div class="form-group" :class="{invalid: $v.confirmation.$error}">
          <label for="passwordConfirm">Confirmation du mot de passe :</label> <br>
          <input type="password" placeholder="Confirmez le mot de passe" id="passwordConfirm" class="form-control" v-model="confirmation" @blur="$v.confirmation.$touch()">
          <small v-if="!$v.confirmation.sameAsPassword && confirmation != ''" id="nomHelp" class="form-text">La confirmation n'est pas identique au mot de passe {{ $v.confirmation.syntaxe }}</small>
        </div>
        <button class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="signUpUser">Créer mon compte</button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data() {
    return {
      nomUtilisateur: '',
      email: '',
      nom: '',
      prenom:'',
      password: '',
      confirmation: '',
      errorMessage: '', 
      isAlert: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    nomUtilisateur: {
      required,
      minLength: minLength(2),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
    nom: {
      required,
      minLength: minLength(2),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
      prenom: {
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
    confirmation: {
      required,
      sameAsPassword: sameAs('password')
    }
  }, 
  methods: {
    signUpUser() {
        let user = {
        nom: this.nom,
        prenom: this.prenom,
        pseudo: this.nomUtilisateur,
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:3000/user/signup/', user)
        .then((response) => {
          this.errorMessage = response.data.message;
          this.isAlert = false;
          setTimeout(() => {
            this.$router.push({ path: '/' })  
          }, 2000)
        })
        .catch(error => { 
          this.errorMessage = error.response.data.message;
          this.isAlert = true;  
          });
    }
  }
};
</script>

<style lang="scss" scoped>

.btn 
{
  margin-top:1rem;
}

form 
{
  max-width: 450px !important;
  padding: 40px 40px;
  margin: auto;
}

input
{
    text-align:center;
}

$primary: #fd2d01;

@import "bootstrap";

.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited,
.btn-primary:focus {
    background-color: #000000;
    border-color: #000000;
}

#content 
{
  width: 80%;
  left:10%;
  top:5%;
  overflow: scroll;
  height: 130vh;
  overflow-x: hidden; 
  overflow-y: hidden;
  border: none;
  margin-top: 70px;
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
  overflow: scroll;
  overflow-x: hidden; 
  overflow-y: hidden;
  border: none;
  }
}

</style>
