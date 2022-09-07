import { Proposal } from '@/types/proposal';
import { IsConfirm } from '@/types/emojiConfirm';
import { State } from '@/services/pinia/store/state';
import moment from 'moment';

const getters = {
  /**
   * proposals view에 table 데이터를 매칭시킨다.
   *
   * @returns { ProposalsMatchedInfo[] }
   */
  confirmTableMatched: (state: State) => {
    const array: Proposal[] = [];

    for (const proposal of state.proposalsInfo) {
      const is_confirm = proposal.is_confirm as number;

      const index = IsConfirm[is_confirm];

      switch (index) {
        case 'SUBMISSION_COMPLETE':
          proposal.is_confirm = '제출완료';
          break;
        case 'UNDER_REVIEW':
          proposal.is_confirm = '심사중';
          break;
        case 'NOT_APPROVED':
          proposal.is_confirm = '미승인';
          break;
        case 'APPROVED':
          proposal.is_confirm = '승인';
          break;
      }

      const dateFormat = moment(proposal.createdAt).format('YYYY-MM-DD');
      proposal.createdAt = dateFormat;

      array.push(proposal);
    }

    return array;
  },
  /**
   * proposal view에 is_confirm 데이터의 값을 심사 과정 값으로 매칭시킨다.
   *
   * @returns { string }
   */
  confirmMatched: (state: State) => {
    const is_confirm = state.proposalInfo.is_confirm as number;

    const index = IsConfirm[is_confirm];

    switch (index) {
      case 'SUBMISSION_COMPLETE':
        return '제출완료';
      case 'UNDER_REVIEW':
        return '심사중';
      case 'NOT_APPROVED':
        return '미승인';
      case 'APPROVED':
        return '승인';
    }
  },
  /**
   * proposal view에 createdAt 데이터의 값을 format 시킨다.
   *
   * @returns { string }
   */
  createAtToMoment: (state: State) => {
    const createAt = state.proposalInfo.createdAt;

    return moment(createAt).format('YYYY-MM-DD HH:mm:ss');
  },
};

type Getters = typeof getters;

export { getters, Getters };
