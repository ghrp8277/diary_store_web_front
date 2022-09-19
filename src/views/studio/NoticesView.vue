<template>
  <div class="notices" v-if="dynamicComponent">
    <component :is="dynamicComponent" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  defineAsyncComponent,
  onMounted,
  computed,
  watch,
  ref,
} from '@vue/composition-api';
import stores from '@/stores';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'NoticesView',
  setup() {
    const { noticesInfo, noticePage } = storeToRefs(stores.store);

    const dynamicComponent = computed(() => {
      let name = '';

      if (noticesInfo.value.length > 0) name = 'Content.vue';
      else name = 'NotContent.vue';

      return defineAsyncComponent({
        loader: () => import(`@/components/notices/${name}`),
        delay: 300,
        timeout: 3000,
      });
    });

    watch(
      () => noticePage.value.page,
      async (newVal, oldVal) => {
        await stores.store.FETCH_STUDIO_NOTICES_INFO(newVal);
      },
    );

    onMounted(async () => {
      await stores.store.FETCH_STUDIO_NOTICES_INFO(noticePage.value.page);
    });

    return { dynamicComponent };
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
