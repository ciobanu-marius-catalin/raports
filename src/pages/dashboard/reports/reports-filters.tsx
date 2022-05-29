import { FC, useMemo } from 'react';
import { Button, DatePicker, Select } from '@components';
import { useReportsData } from './reports-data-context';
import { useProjectsContext, useGatewaysContext } from '@store';
import _ from 'lodash';

const ReportsFilters: FC = () => {
  const { getFilter, setFilter, loadReports } = useReportsData();
  const startDate = getFilter('startDate');
  const endDate = getFilter('endDate');
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

  const startDateProps = useMemo(() => {
    return {
      minDate: commonDateProps.minDate,
      maxDate: endDate ? endDate : commonDateProps.maxDate,
    };
  }, [commonDateProps, endDate]);

  const endDateProps = useMemo(() => {
    return {
      minDate: startDate ? startDate : commonDateProps.minDate,
      maxDate: commonDateProps.maxDate,
    };
  }, [commonDateProps, startDate]);
  return (
    <div className="mvp-pages-reports__header__filters  margin-bottom-large">
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
        {...startDateProps}
        placeholderOpenToDate={commonDateProps.minDate}
      />
      <DatePicker
        value={getFilter('endDate')}
        onChange={setFilter('endDate')}
        placeholderText="To date"
        {...endDateProps}
        placeholderOpenToDate={commonDateProps.maxDate}
      />
      <Button onClick={loadReports}>Generate report</Button>
    </div>
  );
};

export { ReportsFilters };
