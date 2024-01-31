import { atom } from 'recoil';
import type { ResultFilterList } from './types';

// filter 상태 관리
const resultFilterListState = atom<ResultFilterList>({
  key: 'resultFilterListState',
  default: 4,
});

export default resultFilterListState;
