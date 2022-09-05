import apis from '@/apis';
import { defineStore } from 'pinia';
import { state } from './state';
import { getters } from './getters';

const { apiModule } = apis();

export const useStore = defineStore('store', {
  state: () => state,
  actions: {
    async FETCH_PROPOSALS_INFO(username: string) {
      const { data } = await apiModule.storeApiModule.fetchProposalsInfo(
        username,
      );

      this.proposalsInfo = data;
    },
    async FETCH_PROPOSAL_INFO(username: string, id: number) {
      const { data } = await apiModule.storeApiModule.fetchProposalInfo(
        username,
        id,
      );

      this.proposalInfo = data;
    },
  },
  getters,
  persist: {
    storage: sessionStorage,
    key: 'proposalsInfo',
    paths: ['proposalsInfo'],
    afterRestore: (ctx) => {
      console.log(`just restored '${ctx.store.$id}'`);
    },
  },
});
