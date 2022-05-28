import { Card } from '@components';
import { ReportTitle } from './report-title';

const AllProjectsAllGateways = () => {
  return (
    <div>
      <Card className="margin-bottom-large">
        <ReportTitle />
      </Card>
      <Card>
        <span className="bold-text ">Total 14.000$</span>
      </Card>
    </div>
  );
};

export { AllProjectsAllGateways };
