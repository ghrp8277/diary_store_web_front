import { RouteConfig } from 'vue-router';
import proposalsRoute from '@/router/studio/proposals';

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
    path: 'notice',
    name: 'notice',
    component: () => import('@/views/studio/NoticeView.vue'),
  },
  {
    path: 'audition/new',
    name: 'emotion',
    component: () => import('@/views/studio/audition/NewEmotion.vue'),
  },
];

export default routes;
