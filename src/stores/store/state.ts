import { Proposal } from '@/types/proposal';
import { StudioNotice } from '@/types/studioNotice';

/*
 ** STATES
 */
const state = {
  proposalsInfo: [] as Proposal[],

  noticesInfo: [] as StudioNotice[],

  html: '',
};

type State = typeof state;

export { state, State };
