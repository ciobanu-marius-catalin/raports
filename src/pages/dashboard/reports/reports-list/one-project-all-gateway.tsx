import { useGetGroupedData } from './use-get-grouped-data';
import { columnsNamesWithoutGateway } from './config';
import { ReportsWithPieChart } from './reports-with-pie-chart';

const OneProjectAllGateway = () => {
  const { groupedReports, totalSum } = useGetGroupedData({
    groupByKey: 'gatewayId',
  });

  return (
    <ReportsWithPieChart
      groupedReports={groupedReports}
      totalSum={totalSum}
      columnsNames={columnsNamesWithoutGateway}
      totalLabel="PROJECT TOTAL"
    />
  );
};

export { OneProjectAllGateway };
