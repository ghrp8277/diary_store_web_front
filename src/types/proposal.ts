/**
 * @typedef ProposalInfo
 * @property {string} category - 카테고리
 * @property {number} comment - 설명
 * @property {Date} createdt - 생성일
 * @property {Date} is_confirm - 승인 결과
 * @property {Date} product_name - 상품 이름
 * @property {Date} tag - 태그
 */
export interface ProposalInfo {
  category: string;
  comment: string;
  createdAt: Date;
  is_confirm: number;
  product_name: string;
  tag: string;
}
