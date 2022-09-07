import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import studioRoute from '@/router/studio';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainView.vue'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/menu/HomeView.vue'),
      },
      {
        path: 'guide',
        name: 'guide',
        component: () => import('@/views/menu/GuideView.vue'),
      },
      {
        path: 'studio',
        name: 'studio',
        component: () => import('@/views/menu/StudioView.vue'),
        redirect: {
          name: 'audition',
        },
        children: studioRoute,
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
  },
  {
    path: '/500',
    component: () => import('@/views/error/500.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
