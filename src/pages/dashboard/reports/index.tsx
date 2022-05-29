import { ReactNode } from 'react';
import { DashboardLayout } from '@layouts';
import { PageHeader } from './page-header';
import { PageContent } from './page-content';

import { ReportsDataProvider } from './reports-data-context';
import { GatewaysContextProvider, ProjectsContextProvider } from '@store';

function ReportsPage(): ReactNode {
  return (
    <GatewaysContextProvider>
      <ProjectsContextProvider>
        <ReportsDataProvider>
          <div className="mvp-pages-reports">
            <PageHeader />

            <PageContent />
          </div>
        </ReportsDataProvider>
      </ProjectsContextProvider>
    </GatewaysContextProvider>
  );
}

ReportsPage.getLayout = DashboardLayout;

export { ReportsPage };
