<template>
  <div class="box-container">
    <span class="close-button" @click="closeBox"
      ><font-awesome-icon icon="fa-xmark"
    /></span>

    <div class="box-content">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
} from '@vue/composition-api';
import { useStore } from '@/services/pinia';

export default defineComponent({
  name: 'MessageBox',
  setup() {
    const store = useStore();
    const closeBox = () => {
      store.messageBoxSetState(false);
    };
    const message = computed(() => store.messageBoxState.message);
    return { closeBox, message };
  },
});
</script>

<style lang="scss" scoped>
.box-container {
  position: absolute;

  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  // left: 50%;
  // transform: translate(0, -50%);

  min-width: 400px;
  min-height: 200px;

  border: 1px solid #393a3e;
  border-radius: 4px;

  background-color: #fff;
  overflow: hidden;

  pointer-events: auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  margin: 24px;
}

.box-container > .close-button {
  padding: 10px 15px;

  float: right;

  font-size: 20px;

  cursor: pointer;
}

.box-content {
  margin: auto;
  height: 100%;
}
</style>
