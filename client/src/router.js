import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want to lazy load routes.
*/
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

let routes = [
  {path: '/', component: load('index')}
]

let dashboard = {
  path: '/dashboard',
  component: load('layout'),
  children: [
    {
      path: '',
      component: load('dashboard'),
      meta: {
        title: 'Gunbot Dashboard',
        hash: '/dashboard',
        icon: 'layers',
        backRoute: '/'
      }
    }
  ]
}

let settings = {
  path: '/settings',
  component: load('layout'),
  children: [
    {
      path: '',
      component: load('settings'),
      meta: {
        title: 'Gunbot Settings',
        hash: '/settings',
        icon: 'layers',
        backRoute: '/dashboard'
      }
    }
  ]
}

routes.push(dashboard)
routes.push(settings)
routes.push({path: '*', component: load('404')})

const Router = new VueRouter({
  routes
})

export default Router

// export default new VueRouter({
//   /*
//    * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
//    * it is only to be used only for websites.
//    *
//    * If you decide to go with "history" mode, please also open /config/index.js
//    * and set "build.publicPath" to something other than an empty string.
//    * Example: '/' instead of current ''
//    *
//    * If switching back to default "hash" mode, don't forget to set the
//    * build publicPath back to '' so Cordova builds work again.
//    */
//
//   routes: [
//     { path: '/', component: Index }
//   ]
// })
