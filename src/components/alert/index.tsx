import { FC, ReactNode } from 'react';
import classnames from 'classnames';
interface PropsInterface {
  children: ReactNode;
  variant?: 'danger' | 'success';
  className?: string;
}

const Alert: FC<PropsInterface> = ({ children, variant, className }) => {
  const isDanger = variant === 'danger';
  const mergedClassName = classnames(
    className,
    'mvp-control mvp-control-alert',
    { 'mvp-control mvp-control-alert--danger': isDanger }
  );
  return <div className={mergedClassName}>{children}</div>;
};

export { Alert };
