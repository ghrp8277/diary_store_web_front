import apis from '@/apis';
import { IsConfirm } from '@/types/emojiFilesInfo';
import { defineStore } from 'pinia';
import { state, State } from './state';
import moment from 'moment';

const { apiModule } = apis();

export const useStore = defineStore('store', {
  state: () => state,
  actions: {
    async FETCH_EMOJI_FILES_INFO(username: string) {
      const { data } = await apiModule.storeApiModule.fetchEmojiFilesInfo(
        username,
      );

      this.emojiFilesInfo = data;
    },
    async FETCH_PROPOSAL_INFO(username: string, id: number) {
      const { data } = await apiModule.storeApiModule.fetchProposalInfo(
        username,
        id,
      );

      this.proposalInfo = data;
    },
  },
  getters: {
    confirmMathed: (state: State) => {
      const is_confirm = state.proposalInfo.is_confirm;

      const index = IsConfirm[is_confirm];

      switch (index) {
        case 'SUBMISSION_COMPLETE':
          return '제출완료';
        case 'UNDER_REVIEW':
          return '심사중';
        case 'NOT_APPROVED':
          return '미승인';
        case 'APPROVED':
          return '승인';
      }
    },
    createAtToMoment: (state: State) => {
      const createAt = state.proposalInfo.createdAt;

      return moment(createAt).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  persist: {
    storage: sessionStorage,
    key: 'emojiFilesInfo',
    paths: ['emojiFilesInfo'],
    afterRestore: (ctx) => {
      console.log(`just restored '${ctx.store.$id}'`);
    },
  },
});
