import { recoilPersist } from 'recoil-persist';

export const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // unique ID (default: 'recoil-persist')
  storage: localStorage, // configurate which stroage to use (default: localStorage)
});
