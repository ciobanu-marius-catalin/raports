import { ReactNode, useState } from 'react';
import { DashboardLayout } from '@layouts';
import { PageHeader } from './page-header';
import { PageContent } from './page-content';

function ReportsPage(): ReactNode {
  return (
    <div className="mvp-pages-reports">
      <PageHeader />
      <PageContent />
    </div>
  );
}

ReportsPage.getLayout = DashboardLayout;

export { ReportsPage };
