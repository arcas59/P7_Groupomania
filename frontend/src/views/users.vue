<template>
<div class="content">
  <div class="container">
    <img :src="profile.avatar" width="96" height="96" alt="" style="border-radius:100%">
    <h1>{{ profile.pseudo }} </h1>
    <h2> Ses participations </h2>
    <Post @postFlagged="displayAllPosts()" v-for="(post, postIndex) in posts" :key="post.id" :authorId="post.authorId" :message="post.message" :image="post.image" :index="postIndex" :id="post.id"></Post>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Post from '../components/post.vue'

export default {
  data() {
    return {
      posts: [],
      profile: {
        pseudo: '', 
        avatar: ''
      }
    }
  },
  components: {
    Post
  },
  methods: {
    displayPostsFromUser() {
      let id = parseInt(this.$route.params.id, 10); //Convertir en nombre par sécurité
      console.log(id);
      if(Number.isInteger(id))
      {
          axios.get('http://localhost:3000/user/'+id+'/getAllPosts/' , { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(response => {
                console.log(response.data);
                this.posts = response.data;
            })
            .catch(error => {
                console.log(error);
            })
      }
      else console.log('NaN');
    },
    getUserInfos() {
      let id = parseInt(this.$route.params.id, 10); //Convertir en nombre par sécurité
      console.log(id);

      axios.get('http://localhost:3000/user/getInfos/'+id, { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.profile.pseudo = response.data[0].pseudo;
                this.profile.avatar = response.data[0].avatar;
            })
            .catch(error => {
                console.log(error);
            })
    }
  },
  mounted() {
    this.displayPostsFromUser()
    this.getUserInfos();
  }
}
</script>

<style lang="scss">
.content {
  background-color: #bcbcbc;
  min-height: 93vh;
}
</style>
