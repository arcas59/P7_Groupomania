<template>
    <div>
        <h3>Liste des utilisateurs</h3>
        <div class="container">
            <div v-for="(user,index) in usersList" :key="index" class="userList"> 
                <router-link :to="{ name: 'Users', params: { id: user.id }}"> {{ user.pseudo }}</router-link> (Nom: {{ user.nom }} , Prénom: {{ user.prenom}})
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            usersList: []
        }
    }, 
    methods: {
        getUserList() {
            axios.get('http://localhost:3000/user/getAllUsers', { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.usersList = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, 
    mounted() {
        this.getUserList();
    }
}
</script>

<style lang="scss" scoped>

h3 
{
    margin-left: auto;
    margin-right: auto;
    border-bottom: 5px inset #fd2d01;
    width: 300px;
}

a
{
    color: #a82005;
}

a:hover
{
    color: hsl(10, 100%, 74%);
}

.container
{
    margin-top: 25px;

}

</style>