import { EmojiFileInfo } from '@/types/emojiFilesInfo';

const state = {
  emojiFilesInfo: [] as EmojiFileInfo[],
};

type State = typeof state;

export { state, State };
