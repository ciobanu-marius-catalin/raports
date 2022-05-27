import { FC, ReactNode } from 'react';

interface PropsInterface {
  children: ReactNode;
  [key: string]: any;
}
// @ts-ignore
const Button: FC<PropsInterface> = ({ children, ...props }) => {
  return (
    <button className="mvp-control mvp-control-button" {...props}>
      {children}
    </button>
  );
};

export { Button };
