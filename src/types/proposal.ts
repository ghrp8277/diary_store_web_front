import { EmojiConfirm } from './emojiConfirm';
import { EmojiInfo } from './emojiInfo';

/**
 * @typedef Proposal
 * @property {number} id - 번호
 * @property {string} createdAt - 생성일
 * @property {string} category - 카테고리
 * @property {string} comment - 설명
 * @property {Date} createdt - 생성일
 * @property {number} is_confirm - 승인 결과
 * @property {string} product_name - 상품 이름
 * @property {string} tag - 태그
 */
export type Proposal = Pick<EmojiConfirm, 'id' | 'createdAt' | 'is_confirm'> &
  Pick<EmojiInfo, 'product_name' | 'category' | 'comment' | 'tag'>;
