<template>
  <div class="box">
    <div class="loader"></div>
    <p>Loading</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'LoadingComponent',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.box > p {
  font-size: 15px;
  font-weight: bold;
  text-align: center;

  text-indent: 10px;
}

.loader {
  display: inline-block;
  width: 80px;
  height: 75px;
}

.loader:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid black;
  border-color: black transparent black transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
