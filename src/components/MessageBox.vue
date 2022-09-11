<template>
  <transition name="modal" appear>
    <div class="box-container modal-window">
      <span class="close-button" @click="closeBox"
        ><font-awesome-icon icon="fa-xmark"
      /></span>

      <div class="box-content">
        <span class="message-box">{{ message }}</span>
        <button class="btn-confirm" @click="closeBox">확인</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'MessageBox',
  setup() {
    const store = useStore();
    const { boxState } = storeToRefs(store);

    const closeBox = computed(() => boxState.value.confirm);
    const message = computed(() => boxState.value.message);

    return { closeBox, message };
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

// 오버레이 트랜지션
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;

  // 오버레이에 포함되어 있는 모달 윈도의 트랜지션
  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// 딜레이가 적용된 모달 윈도가 제거된 후에 오버레이가 사라짐
.modal-leave-active {
  transition: opacity 0.4s;
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
