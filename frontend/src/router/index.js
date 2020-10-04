import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inscription from '../views/Inscription.vue'
import Wall from '../views/Wall.vue'
import Profile from '../views/Profile.vue'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'

import DashBoardPosts from '../components/DashBoardPosts.vue'
import DashBoardUsersList from '../components/DashBoardUsersList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    title: 'Groupomania'
  },
  {
    path: '/Inscription',
    name: 'Inscription',
    component: Inscription,
    title: 'Groupomania - inscription'
  },
  {
    path:'/Wall',
    name: 'Wall',
    component: Wall
  },
  {
    path:'/Users/:id',
    name: 'Users',
    component: Users
  },
  {
    path:'/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path:'/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path:'/Dashboard/Posts',
        component: DashBoardPosts
      },
      {
        path:'/Dashboard/UsersList',
        component: DashBoardUsersList
      }
    ]
  }
]

const router = new VueRouter({
      mode: 'history',
  routes
})


export default router
