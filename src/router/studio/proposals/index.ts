import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'content',
    components: {
      exist: () => import('@/views/studio/proposals/ContentView.vue'),
      not: () => import('@/views/studio/proposals/NotContentView.vue'),
    },
    props: true,
    redirect: {
      name: 'table',
    },
    children: [
      {
        path: '',
        name: 'table',
        component: () =>
          import('@/views/studio/proposals/content/TableView.vue'),
        props: true,
      },
      {
        path: ':id',
        name: 'proposal',
        component: () =>
          import('@/views/studio/proposals/content/ProposalView.vue'),
        props: true,
      },
    ],
  },
];

export default routes;
