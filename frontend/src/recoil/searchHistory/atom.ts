import { atom } from 'recoil';
import { persistAtom } from '../recoilPersist';
import { SearchHistory } from './types';

const SearchHistoryListState = atom<SearchHistory>({
  key: 'SearchHistoryListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default SearchHistoryListState;
