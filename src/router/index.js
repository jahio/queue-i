import Vue from 'vue'
import VueRouter from 'vue-router'
import QueueProgress from '../views/QueueProgress.vue'
import EnterQueue from '../views/EnterQueue.vue'
import IndividualProgress from '../views/IndividualProgress.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'queue-progress',
    component: QueueProgress
  },
  {
    path: '/enter',
    name: 'enter-queue',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EnterQueue
  },
  {
    path: '/status/:countrycode/:phone',
    name: 'individual-progress',
    component: IndividualProgress,
    props: true
  },
  { path: '*', component: NotFoundComponent }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
