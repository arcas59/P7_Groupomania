import Vue from 'vue'
import VueRouter from 'vue-router'
import accueil from '../views/accueil.vue'
import register from '../views/register.vue'
import filactualite from '../views/filactualite.vue'
import profil from '../views/profil.vue'
import admin from '../views/admin.vue'
import Users from '../views/Users.vue'

import adminPosts from '../components/adminPosts.vue'
import adminUsers from '../components/adminUsers.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'accueil',
    component: accueil,
    title: 'Groupomania'
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    title: 'Groupomania - register'
  },
  {
    path:'/filactualite',
    name: 'filactualite',
    component: filactualite
  },
  {
    path:'/Users/:id',
    name: 'Users',
    component: Users
  },
  {
    path:'/profil',
    name: 'profil',
    component: profil
  },
  {
    path:'/admin',
    name: 'admin',
    component: admin,
    children: [
      {
        path:'/admin/Posts',
        component: adminPosts
      },
      {
        path:'/admin/UsersList',
        component: adminUsers
      }
    ]
  }
];

const router = new VueRouter({
      mode: 'history',
  routes
});


export default router;
