import {
  fetchProposalsInfo,
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
    async FETCH_STUDIO_NOTICES_INFO() {
      const data = await fetchStudioNoticesInfo();

      this.noticesInfo = data;
    },
    async FETCH_STUDIO_NOTICE_INFO(id: number) {
      const data = await fetchStudioNoticeInfo(id);

      this.html = data;
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
