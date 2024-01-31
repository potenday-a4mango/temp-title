export type CardItem = {
  id: number;
  workName: string;
  authorName: string;
  workUrl: string;
  instargramId: string;
  imageUrl: string;
  count: number;
  workSubjectList: string[];
  workCategoryList: string[];
};

export type AllWorkCardListsProps = {
  items: CardItem[];
};

export type HashTagItem = string;

export type WorkCategoryList = string;

export type AllWorkCategoryList = WorkCategoryList[];
