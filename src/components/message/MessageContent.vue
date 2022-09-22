<template>
  <div class="box-content">
    <span class="message-box">{{ message }}</span>
    <button class="btn-confirm" @click="closeBox">확인</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'MessageContent',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  emits: ['closeBox'],
  setup(props, { emit }) {
    const store = useStore();
    const { isShow } = storeToRefs(store);

    isShow.value = true;

    function closeBox() {
      emit('closeBox', false);

      isShow.value = false;
    }

    return {
      closeBox,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-content {
  height: 200px;

  padding: 50px 30px 30px 30px;

  margin: auto;
}

.box-content > .btn-confirm {
  width: 110px;
  height: 40px;
  color: #24231d;
  background-color: #fcd207;
  border: 1px solid #ffbb1b;

  cursor: pointer;
  outline: none;

  position: absolute;
  left: 35%;
  bottom: 30px;
}

.box-content > .btn-confirm:hover {
  background-color: rgba(#fcd207, 0.7);
}

.message-box {
  display: block;
  overflow-x: hidden;
  max-height: 120px;
  color: #2d2e32;

  font-size: 13px;
}
</style>
