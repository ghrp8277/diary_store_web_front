import { EmojiCategory } from '@/types/emojiCategory';
import { Proposal } from '@/types/proposal';
import { StudioNotice } from '@/types/studioNotice';

/*
 ** STATES
 */
const state = {
  proposalsInfo: [] as Proposal[],

  proposalPage: {
    totalPage: 1,
    page: 1,
  },

  noticesInfo: [] as StudioNotice[],

  noticePage: {
    totalPage: 1,
    page: 1,
  },
};

type State = typeof state;

export { state, State };
