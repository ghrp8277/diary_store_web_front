<template>
  <div class="proposals">
    <component v-if="dynamicComponent && !isLoading" :is="dynamicComponent" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@vue/composition-api';
import NotContent from '@/components/proposals/NotContent.vue';
import Content from '@/components/proposals/Content.vue';
import { useStore } from '@/services/pinia/store';
import { useStore as mainStore } from '@/services/pinia';

export default defineComponent({
  name: 'ProposalsView',
  components: {
    NotContent,
    Content,
  },
  setup() {
    const store = useStore();
    const store2 = mainStore();
    const componentName = ref('NotContent');

    onMounted(async () => {
      await store.FETCH_EMOJI_FILES_INFO('test');

      if (store.emojiFilesInfo.length > 0) {
        componentName.value = 'Content';
      }
    });

    return {
      isLoading: computed(() => store2.isLoading),
      dynamicComponent: computed(() => componentName.value),
    };
  },
});
</script>

<style lang="scss" scoped></style>
