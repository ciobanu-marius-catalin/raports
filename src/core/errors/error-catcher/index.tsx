import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

interface ErrorInterface {
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

  const setError = useCallback(
    (e: any) => {
      const response = e?.response;
      const data = response?.data;
      const newError: ErrorInterface = {
        statusCode: response?.status,
        errorMessage: data?.error,
      };
      setInternalError(newError);
    },
    [setInternalError]
  );

  const clearError = useCallback(() => {
    setInternalError(null);
  }, [setInternalError]);

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
