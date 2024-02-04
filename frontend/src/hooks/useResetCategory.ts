// category reset hook
import { useRecoilState } from 'recoil';
import workCategoryListState from '../recoil/cardList/atom';

export default function useResetCategory() {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    workCategoryListState,
  );

  const resetCategory = (): void => {
    setSelectedCategory('전체');
  };

  return resetCategory;
}
