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
import { useStore } from '@/services/pinia/store';

export default defineComponent({
  name: 'ProposalsView',
  setup() {
    const store = useStore();
    const name = ref('');

    onMounted(async () => {
      await store.FETCH_PROPOSALS_INFO('test');

      if (store.proposalsInfo.length > 0) {
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
