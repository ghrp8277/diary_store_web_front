import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    messageBoxState: {
      isMessageBoxShow: false,
      message: '',
      confirm: null as unknown,
    },
  }),
  actions: {
    messageBoxSetState(
      isShow: boolean,
      message = '',
      confirm = () => {
        this.messageBoxState.isMessageBoxShow = !isShow;
      },
    ) {
      this.messageBoxState.isMessageBoxShow = isShow;
      this.messageBoxState.message = message;
      this.messageBoxState.confirm = confirm;
    },
  },
});
