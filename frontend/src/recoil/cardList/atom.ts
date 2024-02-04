import { atom } from 'recoil';
import { persistAtom } from '../recoilPersist';
import type { WorkCategoryList } from './types';

// category 상태 관리
const workCategoryListState = atom<WorkCategoryList>({
  key: 'workCategoryListState',
  default: '전체',
  effects_UNSTABLE: [persistAtom],
});

export default workCategoryListState;
