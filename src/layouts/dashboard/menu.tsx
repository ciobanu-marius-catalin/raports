import Link from 'next/link';
import { FC } from 'react';
import { menuItems } from './config';

const Menu: FC = () => {
  return (
    <div className="mvp-dashboard-layout__sidebar__menu">
      {menuItems.map(({ Icon, href, label }, index) => {
        return (
          <Link href={href} key={index}>
            <a title={label}>
              <Icon />
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export { Menu };
