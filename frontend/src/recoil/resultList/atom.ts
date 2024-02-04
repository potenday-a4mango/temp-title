import { atom } from 'recoil';
import { persistAtom } from '../recoilPersist';
import type { ResultFilterList } from './types';

// filter 상태 관리
const resultFilterListState = atom<ResultFilterList>({
  key: 'resultFilterListState',
  default: 4,
  effects_UNSTABLE: [persistAtom],
});

export default resultFilterListState;
