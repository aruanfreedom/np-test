import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { serachFilter, clearFilter } from '../reducers/orders';

const useFilter = () => {
  const dispatch = useDispatch();

  const handleFilter = useCallback(({ value }) => {
    dispatch(serachFilter(value));
  }, []);

  const clear = useCallback(() => {
    dispatch(clearFilter());
  }, []);

  return { handleFilter, clear };
};

export default useFilter;
