import { computed } from '@vue/composition-api';
import stores from '@/stores';
import { storeToRefs } from 'pinia';

export default (id: number) => {
  const { noticesInfo } = storeToRefs(stores.store);

  const notice = computed(() => {
    const notice = noticesInfo.value.find((notice) => notice.id === id);

    return notice;
  });

  const createdAt = computed(() => notice.value?.createdAt);
  const file_name = computed(() => notice.value?.file_name);
  const is_important = computed(() => notice.value?.is_important);
  const title = computed(() => notice.value?.title);

  return {
    notice,
    createdAt,
    file_name,
    is_important,
    title,
  };
};
