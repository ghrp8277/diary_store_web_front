import { ProposalsInfo } from '@/types/proposals';
import { ProposalInfo } from '@/types/proposal';
import { Notice } from '@/types/notice';

const state = {
  proposalsInfo: [] as ProposalsInfo[],
  proposalInfo: {} as ProposalInfo,

  noticesInfo: [] as Notice[],
  noticeInfo: {} as any,
};

type State = typeof state;

export { state, State };
