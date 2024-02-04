// filtering reset hook
import { useRecoilState } from 'recoil';
import resultFilterListState from '../recoil/resultList/atom';

export default function useResetFiltering() {
  const [selectedFilter, setSelectedFilter] = useRecoilState(
    resultFilterListState,
  );

  const resetFiltering = (): void => {
    setSelectedFilter(4);
  };

  return resetFiltering;
}
