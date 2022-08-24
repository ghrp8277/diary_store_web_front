import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    messageBoxState: {
      isMessageBoxShow: false,
      message: '',
    },
  }),
  actions: {
    messageBoxSetState(isShow: boolean, message = '') {
      this.messageBoxState.isMessageBoxShow = isShow;
      this.messageBoxState.message = message;
    },
  },
});
