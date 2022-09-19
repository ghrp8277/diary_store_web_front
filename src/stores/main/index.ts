import { defineStore } from 'pinia';
import { ref, computed } from '@vue/composition-api';
import {
  getAccessFromCookie,
  getUserFromCookie,
  getRefreshFromCookie,
} from '@/services/cookies';

export const useStore = defineStore('main', () => {
  const username = ref(getUserFromCookie() || '');
  const token = ref(getAccessFromCookie() || '');
  const refreshToken = ref(getRefreshFromCookie() || '');

  const isLoading = ref(false);

  const isBoxShow = ref(false);

  return {
    username,
    token,
    refreshToken,
    isLogin: computed(() => username.value.length != 0),
    isLoading,
    isBoxShow,
  };
});

export type mainStoreType = typeof useStore;
