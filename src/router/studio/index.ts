import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: 'audition',
    name: 'audition',
    component: () => import('@/views/studio/AuditionView.vue'),
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
