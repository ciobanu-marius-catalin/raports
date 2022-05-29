import { useCallback, useMemo } from 'react';
import { axios, useDeepMemo } from '@core';
import _ from 'lodash';

export interface UserInterface {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}

export type UserRepositoryGetItemInterface = (
  id: string | number
) => Promise<UserInterface>;

export interface UserRepositoryInterface {
  getItem: UserRepositoryGetItemInterface;
}

function useUserRepository(): UserRepositoryInterface {
  //the api provided did not seem to have a route for getting a single item so I had to improvise
  const getItem = useCallback(
    async (id: string | number): Promise<UserInterface> => {
      const mergedPath = `/users`;
      const item = await axios.get(mergedPath);
      const users = item?.data?.data || [];
      return users.find((user) => user?.userId === id);
    },
    []
  );

  const routes: UserRepositoryInterface = useMemo(() => {
    return {
      getItem,
    };
  }, [getItem]);

  return routes;
}

export { useUserRepository };
