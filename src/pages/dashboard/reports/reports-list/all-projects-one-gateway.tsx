import { Card } from '@components';
import { useDeepMemo } from '@core';
import { ReportsAccordion } from '../reports-accordion';
import { ReportTitle } from './report-title';
import { useGetGroupedData } from './use-get-grouped-data';
import { columnsNamesWithoutGateway } from './config';

const AllProjectsOneGateway = () => {
  const { groupedReports, totalSum } = useGetGroupedData({
    groupByKey: 'projectId',
  });

  return (
    <div>
      <Card className="margin-bottom-large">
        <ReportTitle />
        <ReportsAccordion
          columnsNames={columnsNamesWithoutGateway}
          groupedReports={groupedReports}
        />
      </Card>
      <Card>
        <span className="bold-text ">Total: {totalSum} USD</span>
      </Card>
    </div>
  );
};

export { AllProjectsOneGateway };
