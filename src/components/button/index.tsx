import { FC, ReactNode } from 'react';

interface PropsInterface {
  children: ReactNode;
  [key: string]: any;
}
// @ts-ignore
const Button: FC<PropsInterface> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export { Button };
