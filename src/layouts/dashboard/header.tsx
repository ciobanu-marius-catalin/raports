import { FC } from 'react';
import Avatar from 'react-avatar';
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

  if (!user) {
    return <></>;
  }

  const fullName = `${user?.firstName} ${user?.lastName}`;
  return (
    <div className="mvp-dashboard-layout__header__user">
      <Avatar name={fullName} size="43" textSizeRatio={2} />
      <a className="mvp-dashboard-layout__header__user__label">{fullName}</a>
    </div>
  );
}
export { Header };
