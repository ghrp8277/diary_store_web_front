import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: 'list',
    name: 'noticesContent',
    component: () => import('@/views/studio/notices/NoticesContentView.vue'),
  },
  {
    path: ':id',
    name: 'notice',
    component: () => import('@/views/studio/notices/NoticeView.vue'),
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
];

export default routes;
