import { FC } from 'react';
import { Menu } from './menu';

const Sidebar: FC = () => {
  return (
    <div className="mvp-dashboard-layout__sidebar">
      <Menu />
    </div>
  );
};

export { Sidebar };
