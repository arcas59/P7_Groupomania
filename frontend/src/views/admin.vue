<template>
  <div class="about">
    <h1 class="titre1">Espace Admin</h1>
    <div class="menuAdmin">
      <div class="menu1">
        <router-link to='/admin/Posts'> <button class="btn btn-outline-danger">Voir les posts signalés</button> </router-link>
      </div>
      <div class="menu2">
        <router-link to='/admin/UsersList'> 
        <button 
        class="btn btn-outline-danger">Liste des utilisateurs </button></router-link>
      </div>
    </div>
    <div class="contenuadmin">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">

.about 
{
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

.contenuadmin
{
  margin-top: 50px;;
}

</style>