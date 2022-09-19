<template>
  <div id="app">
    <router-view :class="{ loading: isLoading, 'box-show': isBoxShow }" />
    <div :class="{ 'layer-dimmed': isBoxShow }"></div>

    <loading v-if="isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import Loading from '@/components/Loading.vue';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'App',
  components: {
    Loading,
  },
  setup() {
    const store = useStore();

    const { isLoading, isBoxShow } = storeToRefs(store);

    return {
      store,
      isLoading: computed(() => isLoading.value),
      isBoxShow: computed(() => isBoxShow.value),
    };
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;

  height: 100%;
  background-color: #fcfcfc;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.loading {
  opacity: 0.6;

  pointer-events: none;
  // 드래그 금지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.layer-dimmed {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.33);
  z-index: 1000;

  transition: all 0.2s;
}

.box-show {
  pointer-events: none;
  // 드래그 금지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
