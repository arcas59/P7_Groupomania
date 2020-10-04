<template>
  <div id="app">
    <nav>
      <appHeader></appHeader>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from './views/Header.vue'

export default {
  components: {
    appHeader
  },
    beforeUpdate() {
      console.log('beforeupdate: ', this.$store.state.avatarUser);
    this.$store.state.tokenToCheck = this.$ls.get('token');
    this.$store.state.userId = this.$ls.get('userId');
    this.$store.commit('CHECK_TOKEN');
  },
    beforeCreate() {
    console.log('beforecreated: ', this.$store.state.avatarUser);
    this.$store.state.tokenToCheck = this.$ls.get('token');
    this.$store.state.userId = this.$ls.get('userId');
    this.$store.dispatch('getInfos');
    this.$store.commit('CHECK_TOKEN');
  },
  beforeMount() {
    console.log('beforemount: ', this.$store.state.avatarUser);
    this.$store.dispatch('getInfos');
  },
  created() {
    console.log('created: ', this.$store.state.avatarUser);
    console.log('created');
  }
}
</script>

<style lang="scss">

@import './sass/main.scss';

* {
  padding:0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
