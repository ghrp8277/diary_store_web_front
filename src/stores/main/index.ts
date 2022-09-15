import { defineStore } from 'pinia';
import { ref, computed } from '@vue/composition-api';
import { getAccessFromCookie, getUserFromCookie } from '@/services/cookies';

export const useStore = defineStore('main', () => {
  const username = ref(getUserFromCookie() || '');
  const token = ref(getAccessFromCookie() || '');

  const isLoading = ref(false);

  const isShow = ref(false);

  return {
    username,
    token,
    isLogin: computed(() => username.value.length != 0),
    isLoading,
    isShow,
  };
});

export type mainStoreType = typeof useStore;
