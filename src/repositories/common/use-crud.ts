import { useCallback, useMemo } from 'react';
import { axios } from '@core';

export interface CrudRepositoryInterface<Type> {
  getItem: (id: string | number) => Promise<Type>;
  get: () => Promise<Type[]>;
}

function useCrud<Type>(path: string): CrudRepositoryInterface<Type> {
  const getItem = useCallback(
    async (id: string | number): Promise<Type> => {
      const mergedPath = `${path}/${id}`;
      const item = await axios.get(mergedPath);
      return item?.data?.data;
    },
    [path]
  );

  const get = useCallback(async (): Promise<Type[]> => {
    const results = await axios.get(path);
    return results?.data?.data;
  }, [path]);

  const routes: CrudRepositoryInterface<Type> = useMemo(() => {
    return {
      getItem,
      get,
    };
  }, [getItem, get]);

  return routes;
}

export { useCrud };
