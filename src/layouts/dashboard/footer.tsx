import { FC } from 'react';
import Link from 'next/link';

const Footer: FC = () => {
  return (
    <div className="mvp-dashboard-layout__footer">
      <Link href="/">
        <a>Terms&Conditions</a>
      </Link>
      <span> | </span>
      <Link href="/">
        <a>Privacy policy</a>
      </Link>
    </div>
  );
};

export { Footer };
