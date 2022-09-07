import { EmojiInfo } from './emojiInfo';
import { ImageFile } from './imageFile';
import { UserMember } from './userMember';

export interface EmojiConfirm {
  id: number;
  createdAt: Date | string;
  is_confirm: number | string;
  userMember: UserMember;
  emojiInfo: EmojiInfo;
  imageFiles: ImageFile[];
}

export enum IsConfirm {
  SUBMISSION_COMPLETE,
  UNDER_REVIEW,
  NOT_APPROVED,
  APPROVED,
}
