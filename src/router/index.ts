import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '@/pages/Сatalog.vue';
import Profile from '@/pages/Profile.vue';
import NotFoundView from '@/pages/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: Catalog
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/*',
    name: 'not-found',
    component: NotFoundView
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router