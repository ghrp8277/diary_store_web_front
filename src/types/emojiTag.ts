import { EmojiCategory } from './emojiCategory';

export interface EmojiTag {
  id: number;
  tag_value: string;
  tag_name: string;
  emojiCategory: EmojiCategory;
}
