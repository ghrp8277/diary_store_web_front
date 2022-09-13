<template>
  <div v-if="dynamicComponent">
    <component :is="dynamicComponent" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  defineAsyncComponent,
  onMounted,
} from '@vue/composition-api';
import stores from '@/stores';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ProposalsView',
  setup() {
    const { proposalsInfo } = storeToRefs(stores.store);
    const { isLoading } = storeToRefs(stores.main);

    const dynamicComponent = computed(() => {
      let name = '';

      if (proposalsInfo.value.length > 0) name = 'Content.vue';
      else name = 'NotContent.vue';

      return defineAsyncComponent({
        loader: () => import(`@/components/proposals/${name}`),
        delay: 300,
        timeout: 3000,
      });
    });

    onMounted(async () => {
      isLoading.value = true;

      await stores.store.FETCH_PROPOSALS_INFO('test');

      isLoading.value = false;
    });

    return {
      dynamicComponent,
    };
  },
});
</script>

<style lang="scss" scoped></style>
