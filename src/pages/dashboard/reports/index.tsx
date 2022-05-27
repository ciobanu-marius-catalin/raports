import { ReactNode, useEffect, useState } from 'react';
import { DashboardLayout } from '@layouts';
import { PageHeader } from './page-header';
import { PageContent } from './page-content';

import { ReportsDataProvider } from './reports-data-context';

function ReportsPage(): ReactNode {

  return (
    <ReportsDataProvider>
      <div className="mvp-pages-reports">
        <PageHeader />
        <PageContent />
      </div>
    </ReportsDataProvider>
  );
}

ReportsPage.getLayout = DashboardLayout;

export { ReportsPage };
