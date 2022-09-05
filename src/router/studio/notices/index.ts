import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'notices-content',
    component: () => import('@/views/studio/notices/ContentView.vue'),
    props: true,
  },
  {
    path: ':id',
    name: 'notice',
    component: () => import('@/views/studio/notices/NoticeView.vue'),
    props: true,
  },
];

export default routes;
