<template>
  <div class="box-container">
    <span class="close-button"><font-awesome-icon icon="fa-xmark" /></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'MessageBox',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.box-container {
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  min-width: 400px;
  min-height: 200px;

  border: 1px solid #393a3e;

  background-color: #fff;
  overflow: hidden;
}

.box-container > .close-button {
  padding: 10px 15px;

  float: right;

  font-size: 20px;
}
</style>
