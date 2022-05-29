import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Alert } from '@components';
import { FC, ReactNode } from 'react';

const ErrorBoundry: FC = ({ children }: { children: ReactNode }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Alert variant="danger">Something went wrong, please try again later</Alert>
  );
}
export { ErrorBoundry };
