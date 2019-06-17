import Vue from 'vue'
import Router from 'vue-router'
import ArtistDetails from '@/components/ArtistDetails'
import Register from '@/components/Register'
import Login from '@/components/Login'
import store from '@/store/store'

Vue.use(Router)

function checkUserAuthorizedAccess (to, from, next) {
  // If user not logged -in, will redirect automatically to login page
  if (!store.getters.isUserLoggedIn) {
    next('/login')
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/*',
      name: 'artist-details',
      component: ArtistDetails,
      beforeEnter: checkUserAuthorizedAccess
    }
  ]
})
