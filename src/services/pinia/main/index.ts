import { defineStore } from 'pinia';
import { reactive, ref } from '@vue/composition-api';

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

  return {
    isLoading,
    boxState,
    setBoxState,
  };
});
