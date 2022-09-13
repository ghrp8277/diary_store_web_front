import { computed } from '@vue/composition-api';
import stores from '@/stores';
import { storeToRefs } from 'pinia';
import { IsConfirm } from '@/types/emojiConfirm';

export default (id: number) => {
  const { proposalsInfo } = storeToRefs(stores.store);

  const proposal = computed(() => {
    const proposal = proposalsInfo.value.find((proposal) => proposal.id === id);

    return proposal;
  });

  const category = computed(() => proposal.value?.category);
  const comment = computed(() => proposal.value?.comment);
  const createdAt = computed(() => proposal.value?.createdAt);
  const is_confirm = computed(() => proposal.value?.is_confirm);
  const product_name = computed(() => proposal.value?.product_name);
  const tag = computed(() => proposal.value?.tag);

  /**
   * proposal view에 is_confirm 데이터의 값을 심사 과정 값으로 매칭시킨다.
   *
   * @returns { string }
   */
  const confirmMatched = computed(() => {
    const confirm = is_confirm.value as number;

    const index = IsConfirm[confirm];

    let result = '';

    switch (index) {
      case 'SUBMISSION_COMPLETE':
        result = '제출완료';
        break;
      case 'UNDER_REVIEW':
        result = '심사중';
        break;
      case 'NOT_APPROVED':
        result = '미승인';
        break;
      case 'APPROVED':
        result = '승인';
        break;
    }

    return result;
  });

  return {
    proposal,
    category,
    comment,
    createdAt,
    is_confirm,
    product_name,
    tag,
    confirmMatched,
  };
};
