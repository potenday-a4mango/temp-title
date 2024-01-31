export type SearchCardItem = {
  id: number;
  workName: string;
  url: string;
  imageUrl: string;
  count: number;
  authorName: string;
  authorInstargramId: string;
  searchTypeList: number[];
  subjectList: string[];
};

export type SearchBarProps = {
  onSubmit: (e: React.FormEvent) => void;
  onKeywordChange: (keyword: string) => void;
  disableSubmit: boolean;
  currentKeyword: string;
};

export type SearchHistoryProps = {
  onHistoryKeywordClick: (content: string) => void;
};
