export interface FileCategoryDto {
  product_name: string;
  author_name: string;
  category: string;
  tag: string;
  comment: string;
}

export interface FileCategorySuccess {
  is_confirm: any;
  product_name: string;
  category: string;
  tag: string;
}
