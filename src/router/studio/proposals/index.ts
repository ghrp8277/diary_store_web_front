import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'proposalsContent',
    component: () =>
      import('@/views/studio/proposals/ProposalsContentView.vue'),
  },
  {
    path: ':id',
    name: 'proposal',
    component: () => import('@/views/studio/proposals/ProposalView.vue'),
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
];

export default routes;
