import { defineStore } from 'pinia';
import { reactive, ref } from '@vue/composition-api';
import { fetchLogin } from '@/apis/user';

export const useStore = defineStore('main', () => {
  const boxState = reactive({
    isShow: false,
    message: '',
    confirm: null as unknown,
  });

  const isLoading = ref(false);

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

  async function login(username: string, password: string) {
    const data = await fetchLogin(username, password);
    localStorage.setItem('token', JSON.stringify(data));
  }

  return {
    isLoading,
    boxState,
    setBoxState,
    login,
  };
});
