<template>
  <div v-if="dynamicComponent && !isLoading">
    <component :is="dynamicComponent" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  defineAsyncComponent,
  onMounted,
  watch,
  ref,
} from '@vue/composition-api';
import stores from '@/stores';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ProposalsView',
  setup() {
    const { username } = storeToRefs(stores.main);
    const { proposalsInfo, proposalPage } = storeToRefs(stores.store);

    const isLoading = ref(false);

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

    watch(
      () => proposalPage.value.page,
      async (newVal, oldVal) => {
        await stores.store.FETCH_PROPOSALS_INFO(username.value, newVal);
      },
    );

    onMounted(async () => {
      isLoading.value = true;

      await stores.store.FETCH_PROPOSALS_INFO(
        username.value,
        proposalPage.value.page,
      );

      isLoading.value = false;
    });

    return {
      dynamicComponent,
      isLoading,
    };
  },
});
</script>

<style lang="scss" scoped></style>
