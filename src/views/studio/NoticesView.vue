<template>
  <div class="notices">
    <router-view :name="name" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
} from '@vue/composition-api';
import { useStore } from '@/stores/store';

export default defineComponent({
  name: 'NoticesView',
  setup() {
    const store = useStore();
    const name = ref('');

    onMounted(async () => {
      await store.FETCH_STUDIO_NOTICES_INFO('test');

      if (store.noticesInfo.length > 0) {
        name.value = 'exist';
      } else name.value = 'not';
    });

    return { name: computed(() => name.value) };
  },
});
</script>

<style lang="scss" scoped>
.notices {
  margin: 30px 60px;
}
.notices-title {
  text-align: left;

  border-bottom: 1px solid #000;

  padding: 0 0 10px;
}
</style>
