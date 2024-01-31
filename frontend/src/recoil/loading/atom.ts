import { atom } from 'recoil';
import type { Loading } from './types';

// loading 상태 관리
const loadingState = atom<Loading>({
  key: 'loadingState',
  default: false,
});

export default loadingState;
