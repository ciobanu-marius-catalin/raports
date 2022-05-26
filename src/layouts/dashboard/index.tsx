import { ReactElement, ReactNode } from 'react';

import { Header } from './header';
import { Sidebar } from './sidebar';
import { Footer } from './footer';

interface BasicProps {
  children: ReactNode;
}

function DashboardLayout(children: ReactElement): ReactElement {
  return (
    <div className="mvp-dashboard-layout">
      <Header />
      <div className="mvp-dashboard-layout__content__container">
        <Sidebar />
        <Content>{children}</Content>
      </div>
      <Footer />
    </div>
  );
}

function Content({ children }: BasicProps): ReactElement {
  return <div className="mvp-dashboard-layout__content">{children}</div>;
}

export { DashboardLayout };
