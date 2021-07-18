import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { serachFilter, clearFilter } from '../reducers/orders';

const useFilter = () => {
  const dispatch = useDispatch();

  const usecase = useCallback(({ value }) => {
    dispatch(serachFilter(value));
  }, []);

  const clear = useCallback(() => {
    dispatch(clearFilter());
  }, []);

  return { usecase, clear };
};

export default useFilter;
