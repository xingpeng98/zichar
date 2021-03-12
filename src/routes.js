// Import the components you want to define routes for.
import Home from './components/PageContent.vue'
import Orders from './components/Orders.vue'
import Modify from './components/Modify.vue'
import Dashboard from './components/Dashboard.vue'

export default [
  { path: '/', component: Home },
  { path: '/orders', component: Orders },
  { path: '/modify', name: 'modify', props: true, component: Modify},
  { path: '/dashboard', component: Dashboard}
]
