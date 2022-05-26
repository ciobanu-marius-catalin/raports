import { useCallback, useMemo } from 'react';
import { axios } from '@core';

export interface CrudRepositoryInterface<Type> {
  getItem: (id: string | number) => Promise<Type | undefined>;
  get?: () => Promise<Type[]> | undefined;
}

function useCrud<Type>(path: string): CrudRepositoryInterface<Type> {
  const getItem = useCallback(
    async (id: string | number): Promise<Type | undefined> => {
      const mergedPath = `${path}/${id}`;
      const item = await axios.get(mergedPath);
      return item?.data;
    },
    [path]
  );

  const routes = useMemo(() => {
    return {
      getItem,
    };
  }, [getItem]);

  return routes;
}

export { useCrud };
