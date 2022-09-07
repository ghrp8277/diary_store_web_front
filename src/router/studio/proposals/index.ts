import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'proposals-content',
    components: {
      exist: () => import('@/views/studio/proposals/ContentView.vue'),
      not: () => import('@/views/studio/proposals/NotContentView.vue'),
    },
    redirect: {
      name: 'proposals-table',
    },
    children: [
      {
        path: '',
        name: 'proposals-table',
        component: () =>
          import('@/views/studio/proposals/content/TableView.vue'),
      },
      {
        path: ':id',
        name: 'proposal',
        component: () =>
          import('@/views/studio/proposals/content/ProposalView.vue'),
        props: (route) => {
          const id = Number.parseInt(route.params.id);

          if (Number.isNaN(id)) {
            return 0;
          }

          return {
            id,
          };
        },
      },
    ],
  },
];

export default routes;
