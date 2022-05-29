import { Card } from '@components';
import { useDeepMemo } from '@core';
import { ReportsAccordion } from '../reports-accordion';
import { ReportTitle } from './report-title';
import { useGetGroupedData } from './use-get-grouped-data';
import { columnsNamesWithoutGateway } from './config';
import { ReportsTable } from '../reports-table';
import _ from 'lodash';

const OneProjectOneGateway = () => {
  const { groupedReports, totalSum } = useGetGroupedData({
    groupByKey: 'gatewayId',
  });

  const reports = _.get(groupedReports, [0, 'items'], []);

  return (
    <>
      <Card className="margin-bottom-large">
        <ReportTitle />
        <ReportsTable
          items={reports}
          columnsNames={columnsNamesWithoutGateway}
        />
      </Card>
      <Card>
        <span className="bold-text ">Total: {totalSum} USD</span>
      </Card>
    </>
  );
};

export { OneProjectOneGateway };
