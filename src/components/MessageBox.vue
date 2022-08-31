<template>
  <div class="box-container">
    <span class="close-button" @click="closeBox"
      ><font-awesome-icon icon="fa-xmark"
    /></span>

    <div class="box-content">
      <span class="message-box">{{ message }}</span>
      <button class="btn-confirm" @click="closeBox">확인</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { useStore } from '@/services/pinia';

export default defineComponent({
  name: 'MessageBox',
  setup() {
    const store = useStore();
    const closeBox = computed(() => store.messageBoxState.confirm);
    const message = computed(() => store.messageBoxState.message);
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
</style>
