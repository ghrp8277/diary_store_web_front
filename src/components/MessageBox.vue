<template>
  <transition name="modal" appear>
    <div class="box-container modal-window">
      <span class="close-button" @click="closeBox"
        ><font-awesome-icon icon="fa-xmark"
      /></span>

      <slot name="content"></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'MessageBox',
  setup() {
    const store = useStore();
    const { isShow } = storeToRefs(store);

    const closeBox = () => {
      isShow.value = !isShow.value;
    };

    return {
      closeBox,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-container {
  display: block;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -100px 0 0 -200px;

  z-index: 9999;

  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);

  width: 400px;
  height: 200px;

  border: 1px solid #393a3e;
  border-radius: 4px;

  background-color: #fff;
  overflow: hidden;

  pointer-events: auto;
}

.box-container > .close-button {
  padding: 10px 15px;

  float: right;

  font-size: 20px;

  cursor: pointer;
}

// 오버레이 트랜지션
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;

  // 오버레이에 포함되어 있는 모달 윈도의 트랜지션
  .modal-window {
    transition: opacity 0.2s, transform 0.2s;
  }
}

// 딜레이가 적용된 모달 윈도가 제거된 후에 오버레이가 사라짐
.modal-leave-active {
  transition: opacity 0.2s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
