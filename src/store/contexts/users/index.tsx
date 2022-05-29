import React, {
  ReactElement,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import _ from 'lodash';
import type { UserInterface, UserRepositoryInterface } from '@repositories';
import { useDeepMemo, useErrorCatcher } from '@core';
import { useUserRepository } from '@repositories';

interface UserContextProviderProps {
  children: ReactElement;
}

interface UserContextInterface {
  user: UserInterface | null;
  setContext: Function;
  loadUser: Function;
}

const defaultContext: UserContextInterface = {
  user: null,
  setContext: _.noop,
  loadUser: _.noop,
};
const UserContext = React.createContext(defaultContext);

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const { setError } = useErrorCatcher();
  const [user, setInternalUser] = useState<UserInterface | null>(null);

  const setUser: (newUser: UserInterface) => void = useCallback(
    (newUser: UserInterface) => {
      setInternalUser(newUser);
      saveUserDataInCookie(newUser);
    },
    [setInternalUser]
  );

  const repository: UserRepositoryInterface = useUserRepository();

  const loadUser = useCallback(async () => {
    const userId = getCurrentUserId();
    try {
      const userData: UserInterface | undefined = await repository.getItem(
        userId
      );
      if (userData) {
        setUser(userData);
      }
    } catch (e) {
      setError(e);
    }
  }, [repository]);

  const contextValue = useDeepMemo(() => {
    return {
      user,
      setUser,
      loadUser,
    };
  }, [user, setUser]);

  //on mounted we refresh the data
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

function useUserContext() {
  const context = useContext(UserContext);

  return context;
}

function getCurrentUserId() {
  return 'rahej';
}

/**
 * Update the cookie containg the user data. The cookie is used so the user can see some data before we do a request on mount
 * This will give the user a better experience than to wait for the data to load
 * @param user
 */
function saveUserDataInCookie(user: UserInterface) {}

/**
 * Return the current user data from cookie.
 */
function getUserDataFromCookie(): UserInterface | void {}

export { UserContextProvider, useUserContext };
