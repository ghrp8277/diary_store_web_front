import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import studioRoute from '@/router/studio';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

Vue.use(VueRouter);

export function requireAuth(
  to: Route,
  from: Route,
  next: NavigationGuardNext<Vue>,
) {
  const store = useStore();
  const { isLogin } = storeToRefs(store);

  if (
    to.meta &&
    to.matched.some((record) => record.meta.authRequired) &&
    !isLogin.value
  ) {
    next('/login');
    return;
  }
  next();
}

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
        path: 'faq',
        name: 'faq',
        component: () => import('@/views/menu/FAQView.vue'),
      },
      {
        path: 'studio',
        name: 'studio',
        component: () => import('@/views/menu/StudioView.vue'),
        meta: { authRequired: true },
        beforeEnter: requireAuth,
        redirect: {
          name: 'audition',
        },
        children: studioRoute,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUpView.vue'),
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
