<template>
  <div class="about">
    <h1 class="titre1">Espace Admin</h1>
    <div class="menuAdmin">
      <div class="menu1">
        <router-link to='/Dashboard/Posts'> <button class="btn btn-outline-danger">Voir les posts signalés</button> </router-link>
      </div>
      <div class="menu2">
        <router-link to='/Dashboard/UsersList'> 
        <button 
        class="btn btn-outline-danger">Liste des utilisateurs </button></router-link>
      </div>
    </div>
    <div class="contenuDashBoard">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
.about {
  background-color: #ffffff;
  min-height: 93vh;
}
.menuAdmin
{
  text-align: center;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.titre1
{
  margin-top: 50px;
}
.contenuDashBoard
{
  margin-top: 50px;;
}
</style>