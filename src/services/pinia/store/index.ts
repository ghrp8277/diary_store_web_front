import apis from '@/apis';
import { defineStore } from 'pinia';
import { state, State } from './state';

const { apiModule } = apis();

export const useStore = defineStore('store', {
  state: () => state,
  actions: {
    async FETCH_EMOJI_FILES_INFO(username: string) {
      const response = await apiModule.storeApiModule.fetchEmojiFilesInfo(
        username,
      );
      const data = response.data;

      this.emojiFilesInfo = data;
    },
    getters: {
      getEmojiFilesInfo: (state: State) => state.emojiFilesInfo,
    },
  },
});
