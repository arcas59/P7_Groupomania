<template>
  <nav class="navbar navbar-expand-sm   navbar-light bg-white">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" style="color: black" to="/">Accueil</router-link>
        </li>
      <li class="nav-item">
        <router-link class="nav-link" style="color: black" to="/register" v-if="!(this.$store.state.isLogged)">S'inscrire</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="color: black" to="/filactualite" v-if="this.$store.state.isLogged"> Fil d'actualité</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="color: black" to="/profil" v-if="this.$store.state.isLogged">Profil</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="color: black" to="/admin" v-if="this.$store.state.roleUser == 'admin'"> Admin </router-link>
      </li>
      </ul>
      <div class="social-part">
        <i class="fa fa-facebook" aria-hidden="true"></i>
        <i class="fa fa-twitter" aria-hidden="true"></i>
        <i class="fa fa-instagram" aria-hidden="true"></i>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">

.navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {
    color: #fd2d01 !important;
}

.active a
{
  color : #fd2d01 !important;
}

.social-part .fa
{
    padding-right:20px;
}

ul li a
{
    margin-right: 20px;
}

</style>
