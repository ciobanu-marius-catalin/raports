import { useReportsData } from '../reports-data-context';
import { useGatewaysContext, useProjectsContext } from '@store';
import _ from 'lodash';

const ReportTitle = () => {
  const { activeFilters } = useReportsData();
  const { labelsByValue: projectLabelsByValue } = useProjectsContext();
  const { labelsByValue: gatewayLabelsByValue } = useGatewaysContext();
  const { project, gateway } = activeFilters;
  const projectLabel = _.get(projectLabelsByValue, project);
  const gatewayLabel = _.get(gatewayLabelsByValue, gateway);
  return (
    <div className="mvp-pages-reports__content__title">
      {projectLabel} | {gatewayLabel}
    </div>
  );
};

export { ReportTitle };
