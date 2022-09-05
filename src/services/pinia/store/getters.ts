import { IsConfirm, ProposalsMatchedInfo } from '@/types/proposals';
import { State } from '@/services/pinia/store/state';
import moment from 'moment';

const getters = {
  /**
   * proposals view에 table 데이터를 매칭시킨다.
   *
   * @returns { ProposalsMatchedInfo[] }
   */
  confirmTableMatched: (state: State) => {
    const array: ProposalsMatchedInfo[] = [];

    for (const proposal of state.proposalsInfo) {
      const result = proposal as ProposalsMatchedInfo;

      const is_confirm = Number(proposal.is_confirm);
      const index = IsConfirm[is_confirm];

      switch (index) {
        case 'SUBMISSION_COMPLETE':
          result.is_confirm = '제출완료';
          break;
        case 'UNDER_REVIEW':
          result.is_confirm = '심사중';
          break;
        case 'NOT_APPROVED':
          result.is_confirm = '미승인';
          break;
        case 'APPROVED':
          result.is_confirm = '승인';
          break;
      }

      const dateFormat = moment(proposal.createdAt).format('YYYY-MM-DD');
      result.createdAt = dateFormat;

      array.push(result);
    }

    return array;
  },
  /**
   * proposal view에 is_confirm 데이터의 값을 심사 과정 값으로 매칭시킨다.
   *
   * @returns { string }
   */
  confirmMatched: (state: State) => {
    const is_confirm = state.proposalInfo.is_confirm;

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
