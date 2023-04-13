import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/First'
import Login from "@/components/Login.vue"
import Register from "@/components/Register.vue"
import ListDC from "@/components/ListDC.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'first',
        component: First
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/listdc",
      name: "List DC",
      component: ListDC,
    }
  ]
})
