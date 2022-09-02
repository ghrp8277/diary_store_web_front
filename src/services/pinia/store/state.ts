import { EmojiFileInfo } from '@/types/emojiFilesInfo';
import { ProposalInfo } from '@/types/proposal';

const state = {
  emojiFilesInfo: [] as EmojiFileInfo[],
  proposalInfo: {} as ProposalInfo,
};

type State = typeof state;

export { state, State };
