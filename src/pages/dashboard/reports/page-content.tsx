import { EmptyContent } from './empty-content';
import { useReportsData } from './reports-data-context';
import { ReportsList } from './reports-list';
import { FC } from 'react';
import _ from 'lodash';

const PageContent = () => {
  const { reports } = useReportsData();
  const Content: FC = !_.isEmpty(reports) ? ReportsList : EmptyContent;
  return (
    <div className="mvp-pages-reports__content">
      <Content />
    </div>
  );
};

export { PageContent };
