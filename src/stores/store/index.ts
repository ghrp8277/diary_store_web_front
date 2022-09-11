import {
  fetchProposalsInfo,
  fetchProposalInfo,
  fetchStudioNoticesInfo,
  fetchStudioNoticeInfo,
} from '@/apis/store';
import { defineStore } from 'pinia';
import { state } from './state';
import { getters } from './getters';

export const useStore = defineStore('store', {
  state: () => state,
  actions: {
    async FETCH_PROPOSALS_INFO(username: string) {
      const data = await fetchProposalsInfo(username);

      this.proposalsInfo = data;
    },
    async FETCH_PROPOSAL_INFO(username: string, id: number) {
      const data = await fetchProposalInfo(username, id);

      this.proposalInfo = data;
    },
    async FETCH_STUDIO_NOTICES_INFO(username: string) {
      const data = await fetchStudioNoticesInfo(username);

      this.noticesInfo = data;
    },
    async FETCH_STUDIO_NOTICE_INFO(username: string, id: number) {
      const data = await fetchStudioNoticeInfo(username, id);

      this.noticeInfo = data;
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
