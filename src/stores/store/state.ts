import { Proposal } from '@/types/proposal';
import { StudioNotice } from '@/types/studioNotice';

/*
 ** STATES
 */
const state = {
  proposalsInfo: [] as Proposal[],
  proposalInfo: {} as Proposal,

  noticesInfo: [] as StudioNotice[],
  noticeInfo: {} as any,
};

type State = typeof state;

export { state, State };
