import { useGetGroupedData } from './use-get-grouped-data';
import { columnsNamesWithoutGateway } from './config';
import { ReportsWithPieChart } from './reports-with-pie-chart';

const AllProjectsOneGateway = () => {
  const { groupedReports, totalSum } = useGetGroupedData({
    groupByKey: 'projectId',
  });

  return (
    <ReportsWithPieChart
      groupedReports={groupedReports}
      totalSum={totalSum}
      columnsNames={columnsNamesWithoutGateway}
      totalLabel="GATEWAY TOTAL"
    />
  );
};

export { AllProjectsOneGateway };
