import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';

export interface ErrorInterface {
  errorMessage?: string | null;
  statusCode?: number | null;
}

interface ErrorCatcherContextInterface {
  error: ErrorInterface | null;
  setError: Function;
  clearError: Function;
}

const defaultErrorValue: ErrorInterface = {
  errorMessage: null,
  statusCode: null,
};

const defaultValue: ErrorCatcherContextInterface = {
  error: defaultErrorValue,
  setError: Function,
  clearError: Function,
};

const ErrorCatcherContext = createContext(defaultValue);

const ErrorCatcher: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setInternalError] = useState<ErrorInterface | null>(null);
  const router = useRouter();
  const pathname = router?.pathname;
  const setError = useCallback(
    (e: any) => {
      console.error(e);
      const response = e?.response;
      const data = response?.data;
      const newError: ErrorInterface = {
        statusCode: response?.status,
        errorMessage:
          data?.error || 'Something went wrong, please try again later',
      };
      setInternalError(newError);
    },
    [setInternalError]
  );

  const clearError = useCallback(() => {
    setInternalError(null);
  }, [setInternalError]);

  //clear errors on page change
  useEffect(() => {
    clearError();
  }, [pathname]);

  const context: ErrorCatcherContextInterface = useMemo(() => {
    return {
      error,
      setError,
      clearError,
    };
  }, [error, setError, clearError]);
  return (
    <ErrorCatcherContext.Provider value={context}>
      {children}
    </ErrorCatcherContext.Provider>
  );
};

const useErrorCatcher = (): ErrorCatcherContextInterface => {
  return useContext(ErrorCatcherContext);
};

export { ErrorCatcher, useErrorCatcher };
