import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'notices-content',
    components: {
      exist: () => import('@/views/studio/notices/ContentView.vue'),
      not: () => import('@/views/studio/notices/NotContentView.vue'),
    },
    redirect: {
      name: 'notices-table',
    },
    children: [
      {
        path: '',
        name: 'notices-table',
        component: () => import('@/views/studio/notices/content/TableView.vue'),
      },
      {
        path: ':id',
        name: 'notice',
        component: () =>
          import('@/views/studio/notices/content/NoticeView.vue'),
        props: (route) => {
          const id = Number.parseInt(route.params.id);
          const file_name = route.params.file_name;

          if (Number.isNaN(id)) {
            return 0;
          }

          return {
            id,
            file_name,
          };
        },
      },
    ],
  },
];

export default routes;
