import { ProposalsInfo } from '@/types/proposals';
import { ProposalInfo } from '@/types/proposal';

const state = {
  proposalsInfo: [] as ProposalsInfo[],
  proposalInfo: {} as ProposalInfo,
};

type State = typeof state;

export { state, State };
