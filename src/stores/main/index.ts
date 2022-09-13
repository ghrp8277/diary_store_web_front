import { defineStore } from 'pinia';
import { reactive, ref, computed } from '@vue/composition-api';
import { getAccessFromCookie, getUserFromCookie } from '@/services/cookies';

export const useStore = defineStore('main', () => {
  const username = ref(getUserFromCookie() || '');
  const token = ref(getAccessFromCookie() || '');

  const isLoading = ref(false);

  const boxState = reactive({
    isShow: false,
    message: '',
    confirm: null as unknown,
  });

  function setBoxState(
    isShow: boolean,
    message = '',
    confirm = () => {
      boxState.isShow = !isShow;
    },
  ) {
    boxState.isShow = isShow;
    boxState.message = message;
    boxState.confirm = confirm;
  }

  return {
    username,
    token,
    isLogin: computed(() => username.value.length != 0),
    isLoading,
    boxState,
    setBoxState,
  };
});

export type mainStoreType = typeof useStore;
