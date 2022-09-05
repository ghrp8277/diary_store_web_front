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
    props: true,
    redirect: {
      name: 'content',
    },
    children: proposalsRoute,
  },
  {
    path: 'notices',
    name: 'notices',
    component: () => import('@/views/studio/NoticesView.vue'),
    props: true,
    redirect: {
      name: 'notices-content',
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
    props: true,
  },
];

export default routes;
