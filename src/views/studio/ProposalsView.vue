<template>
  <div>
    <router-view :name="name" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@vue/composition-api';
import { useStore } from '@/stores/store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ProposalsView',
  setup() {
    const store = useStore();
    const { proposalsInfo } = storeToRefs(store);
    const name = ref('');

    onMounted(async () => {
      await store.FETCH_PROPOSALS_INFO('test');

      if (proposalsInfo.value.length > 0) {
        name.value = 'exist';
      } else name.value = 'not';
    });

    return {
      name: computed(() => name.value),
    };
  },
});
</script>

<style lang="scss" scoped></style>
