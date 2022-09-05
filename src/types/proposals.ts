export interface ProposalsInfo {
  id: number;
  createdAt: Date;
  is_confirm: string;
  product_name: string;
}

export type ProposalsMatchedInfo = {
  [key in 'id' | 'createdAt' | 'is_confirm' | 'product_name']:
    | string
    | number
    | Date;
};

export enum IsConfirm2 {
  '제출완료',
  '심사중',
  '미승인',
  '승인',
}

export enum IsConfirm {
  SUBMISSION_COMPLETE = 0,
  UNDER_REVIEW = 1,
  NOT_APPROVED = 2,
  APPROVED = 3,
}
