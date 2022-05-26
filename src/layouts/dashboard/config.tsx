import { FC, ReactElement, ReactNode } from 'react';
import { Dashboard, Logout, Reports, Computer, Squares } from '@icons';

interface MenuItem {
  href: string;
  label: string;
  Icon: FC;
}

const menuItems: MenuItem[] = [
  {
    href: '#',
    label: 'Dashboard',
    Icon: Dashboard,
  },
  {
    href: '#',
    label: 'Second menu item',
    Icon: Squares,
  },
  {
    href: '#',
    label: 'Third menu item',
    Icon: Computer,
  },
  {
    href: '#',
    label: 'Reports',
    Icon: Reports,
  },
  {
    href: '#',
    label: 'logout',
    Icon: Logout,
  },
];

export { menuItems };
