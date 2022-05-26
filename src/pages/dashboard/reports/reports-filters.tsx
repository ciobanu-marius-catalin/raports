import { FC, useState } from 'react';
import { Button, DatePicker, Select } from '@components';
const projectOptions = [
  { label: 'Project1', value: 'project1' },
  { label: 'Project2', value: 'project2' },
];
const gatewayOptions = [
  { label: 'Gateway1', value: 'gateway1' },
  { label: 'Gateway2', value: 'gateway2' },
];
const ReportsFilters: FC = () => {
  const [project, setProject] = useState();
  const [gateway, setGateway] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <div className="mvp-pages-reports__header__filters">
      <Select value={project} onChange={setProject} options={projectOptions} />
      <Select value={gateway} onChange={setGateway} options={gatewayOptions} />
      <DatePicker value={startDate} onChange={setStartDate} />
      <DatePicker value={endDate} onChange={setEndDate} />
      <Button>Generate report</Button>
    </div>
  );
};

export { ReportsFilters };
