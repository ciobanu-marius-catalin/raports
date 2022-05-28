import { FC, ReactNode } from 'react';
import classnames from 'classnames';

interface PropsInterface {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const Card: FC<PropsInterface> = ({ children, className, ...props }) => {
  const mergedClassNames = classnames(
    className,
    'mvp-control-card mvp-control'
  );
  return (
    <div {...props} className={mergedClassNames}>
      {children}
    </div>
  );
};

export { Card };
