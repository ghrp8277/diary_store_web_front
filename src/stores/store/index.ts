import { fetchProposalsInfo, fetchStudioNoticesInfo } from '@/apis/store';
import { defineStore } from 'pinia';
import { state } from './state';
import { getters } from './getters';

export const useStore = defineStore('store', {
  state: () => state,
  actions: {
    async FETCH_PROPOSALS_INFO(username: string, page: number) {
      const data = await fetchProposalsInfo(username, page);

      this.proposalsInfo = data.proposals;

      this.proposalPage.totalPage = data.totalPage;
    },
    async FETCH_STUDIO_NOTICES_INFO(page: number) {
      const data = await fetchStudioNoticesInfo(page);

      this.noticesInfo = data.notices;

      this.noticePage.totalPage = data.totalPage;
    },
  },
  getters,
  // persist: {
  //   storage: sessionStorage,
  //   key: 'proposalsInfo',
  //   paths: ['proposalsInfo'],
  //   afterRestore: (ctx) => {
  //     console.log(`just restored '${ctx.store.$id}'`);
  //   },
  // },
});
