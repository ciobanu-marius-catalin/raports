import { Card } from '@components';
import { useDeepMemo } from '@core';
import { ReportsAccordion } from '../reports-accordion';
import { ReportTitle } from './report-title';
import { useGetGroupedData } from './use-get-grouped-data';

const AllProjectsAllGateways = () => {
  const { groupedReports, totalSum } = useGetGroupedData({
    groupByKey: 'projectId',
  });
  const columnsNames = [
    {
      label: 'Date',
      value: 'created',
    },
    {
      label: 'Gateway',
      value: 'gateway.name',
    },
    {
      label: 'Transaction ID',
      value: 'paymentId',
    },
    {
      label: 'Amount',
      value: 'amount',
    },
  ];

  return (
    <div>
      <Card className="margin-bottom-large">
        <ReportTitle />
        <ReportsAccordion
          columnsNames={columnsNames}
          groupedReports={groupedReports}
        />
      </Card>
      <Card>
        <span className="bold-text ">Total: {totalSum} USD</span>
      </Card>
    </div>
  );
};

export { AllProjectsAllGateways };
