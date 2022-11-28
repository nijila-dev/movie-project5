import { createRouter, createWebHistory} from "vue-router";
import HomeView from '@/views/HomeView.vue';
import { Routes } from '@/constants/routes.constant';


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: `${Routes.dashboard}`,
      name: 'dashboard',
      component: HomeView,
    },
    {
      path: `${Routes.show}/:id`,
      name: 'show',
      component: () => import('@/views/ShowDetailsView.vue'),
    },
  ],
});

export default router;
