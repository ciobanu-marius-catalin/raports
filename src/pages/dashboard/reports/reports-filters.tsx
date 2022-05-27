import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, DatePicker, Select } from '@components';
import { useReportsData } from './reports-data-context';
import { useLoadProjects } from './use-load-projects';
import { useLoadGateways } from './use-load-gateways';


const ReportsFilters: FC = () => {
  const {
    project,
    setProject,
    gateway,
    setGateway,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loadReports,
  } = useReportsData();

  const projectOptions = useLoadProjects();
  const gatewayOptions = useLoadGateways();

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
        value={project}
        onChange={setProject}
        options={projectOptions}
        placeholder="Select project"
      />
      <Select
        value={gateway}
        onChange={setGateway}
        options={gatewayOptions}
        placeholder="Select gateway"
      />
      <DatePicker
        value={startDate}
        onChange={setStartDate}
        placeholderText="From date"
        {...commonDateProps}
        openToDate={commonDateProps.minDate}
      />
      <DatePicker
        value={endDate}
        onChange={setEndDate}
        placeholderText="To date"
        {...commonDateProps}
        openToDate={commonDateProps.maxDate}
      />
      <Button onClick={loadReports}>Generate report</Button>
    </div>
  );
};

export { ReportsFilters };
