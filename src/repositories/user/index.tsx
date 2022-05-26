import { useCrud } from '../common';
import type { CrudRepositoryInterface } from '../common';
import { useCallback } from 'react';
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
) => Promise<UserInterface | undefined>;

export interface UserRepositoryInterface {
  getItem: UserRepositoryGetItemInterface;
}

function useUserRepository(): UserRepositoryInterface {
  //the api provided did not seem to have a route for getting a single item so I had to improvise
  const getItem = useCallback(
    async (id: string | number): Promise<UserInterface | undefined> => {
      const mergedPath = `/users`;
      const item = await axios.get(mergedPath);
      const users = item?.data || [];
      return users.find((user) => user?.id === id);
    },
    []
  );

  const routes: UserRepositoryInterface = useDeepMemo(() => {
    return {
      getItem,
    };
  }, [getItem]);

  return routes;
}

export { useUserRepository };
