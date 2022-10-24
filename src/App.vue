<template>
  <div id="app">
    <router-view :class="{ 'event-show': isShow }" />
    <div :class="{ 'layer-dimmed': isShow }"></div>

    <loading v-if="isLoading" />

    <div class="cursor"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  onUnmounted,
} from '@vue/composition-api';
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

    const { isLoading, isShow } = storeToRefs(store);

    onMounted(() => {
      const cursor = document.querySelector('.cursor') as HTMLElement;

      function onMouseMove(e: MouseEvent) {
        let x = e.clientX;
        let y = e.clientY;

        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
      }

      function onMouseDown(e: MouseEvent) {
        cursor.classList.add('click');
      }

      function onMouseUp(e: MouseEvent) {
        cursor.classList.remove('click');
      }

      function onMouseLeave(e: MouseEvent) {
        cursor.style.display = 'none';
      }

      function onMouseOver(e: MouseEvent) {
        if (cursor.style.display == 'none') {
          cursor.style.display = 'block';
        }
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mouseover', onMouseOver);
    });

    return {
      store,
      isLoading,
      isShow: computed(() => {
        if (isShow.value || isLoading.value) return true;
        return false;
      }),
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

  cursor: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.layer-dimmed {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.66);
  z-index: 1000;

  transition: all 0.2s;
}

.event-show {
  pointer-events: none;
  // 드래그 금지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

// cursor
.cursor {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: rgba(#5f5f5f, 0.6);
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: width 0.3s, height 0.3s, opacity 0.3s;

  z-index: 99999;
}

.click {
  background: rgba(red, 0.4);
  width: 8px;
  height: 8px;
}
</style>
