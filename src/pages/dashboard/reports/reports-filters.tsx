import { FC, useMemo } from 'react';
import { Button, DatePicker, Select } from '@components';
import { useReportsData } from './reports-data-context';
import { useProjectsContext, useGatewaysContext } from '@store';

const ReportsFilters: FC = () => {
  const { getFilter, setFilter, loadReports } = useReportsData();

  const { options: projectOptions, items } = useProjectsContext();
  const { options: gatewayOptions } = useGatewaysContext();

  const commonDateProps = useMemo(() => {
    const minDate = new Date('2021-01-01');
    const maxDate = new Date('2021-12-31');
    return {
      minDate,
      maxDate,
    };
  }, []);
  return (
    <div className="mvp-pages-reports__header__filters">
      <Select
        value={getFilter('project')}
        onChange={setFilter('project')}
        options={projectOptions}
        placeholder="Select project"
      />
      <Select
        value={getFilter('gateway')}
        onChange={setFilter('gateway')}
        options={gatewayOptions}
        placeholder="Select gateway"
      />
      <DatePicker
        value={getFilter('startDate')}
        onChange={setFilter('startDate')}
        placeholderText="From date"
        {...commonDateProps}
        placeholderOpenToDate={commonDateProps.minDate}
      />
      <DatePicker
        value={getFilter('endDate')}
        onChange={setFilter('endDate')}
        placeholderText="To date"
        {...commonDateProps}
        placeholderOpenToDate={commonDateProps.maxDate}
      />
      <Button onClick={loadReports}>Generate report</Button>
    </div>
  );
};

export { ReportsFilters };
