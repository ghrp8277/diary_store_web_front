import { RouteConfig } from 'vue-router';
import proposalsRoute from '@/router/studio/proposals';
import noticesRoute from '@/router/studio/notices';

const routes: Array<RouteConfig> = [
  {
    path: 'audition',
    name: 'audition',
    component: () => import('@/views/studio/AuditionView.vue'),
  },
  {
    path: 'proposals',
    name: 'proposals',
    component: () => import('@/views/studio/ProposalsView.vue'),
    redirect: {
      name: 'proposalsContent',
    },
    children: proposalsRoute,
  },
  {
    path: 'notices',
    name: 'notices',
    component: () => import('@/views/studio/NoticesView.vue'),
    redirect: {
      name: 'noticesContent',
    },
    children: noticesRoute,
  },
  {
    path: 'audition/new',
    name: 'emotion',
    component: () => import('@/views/studio/audition/NewEmotion.vue'),
  },
  {
    path: 'audition/success',
    name: 'success',
    component: () => import('@/views/studio/audition/SuccessPage.vue'),
    props: (route) => ({
      product_name: route.query.product_name,
      category: route.query.category,
      tag: route.query.tag,
      is_confirm: route.query.is_confirm,
    }),
  },
];

export default routes;
