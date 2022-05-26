import { FC } from 'react';

import AdminBurgerMenu from '../../icons/admin-menu-burger.svg';
import { useUserContext } from '@store';
import Link from 'next/link';

const Header: FC = () => {
  return (
    <div className="mvp-dashboard-layout__header">
      <div className="mvp-dashboard-layout__header__logo__container">
        <Link href="/">
          <a className="mvp-dashboard-layout__header__logo">
            <img src="/logo.png" width={27} height={40} alt="logo" />
          </a>
        </Link>
      </div>

      <AdminBurgerMenu className="mvp-dashboard-layout__header__burger" />
      <UserInfo />
    </div>
  );
};

function UserInfo() {
  const { user } = useUserContext();

  // if (!user) {
  //   return <></>;
  // }
  //
  // const fullName = `${user?.firstName}${user?.lastName}`;
  const fullName = 'John Doe';
  return <div className="mvp-dashboard-layout__header__user">{fullName}</div>;
}
export { Header };
