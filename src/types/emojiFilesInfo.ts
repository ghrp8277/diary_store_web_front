export interface EmojiFileInfo {
  id: number;
  createdAt: Date;
  is_confirm: number;
  product_name: string;
}

// export enum IsConfirm {
//   SUBMISSION_COMPLETE = '제출 완료',
//   UNDER_REVIEW = '심사중',
//   NOT_APPROVED = '미승인',
//   APPROVD = '승인',
// }

export enum IsConfirm {
  SUBMISSION_COMPLETE = 0,
  UNDER_REVIEW = 1,
  NOT_APPROVED = 2,
  APPROVED = 3,
}
