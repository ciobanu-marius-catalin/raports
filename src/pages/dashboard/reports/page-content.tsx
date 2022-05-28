import { useReportsData } from './reports-data-context';
import { FC, useMemo } from 'react';
import _ from 'lodash';
import {
  ALL_ITEMS_VALUE,
  REPORTS_LIST_TYPES_VALUES,
  REPORTS_LIST_COMPONENTS_BY_TYPE,
} from './config';
import { useDeepMemo } from '@core';

const PageContent = () => {
  const Content = useGetReportsComponent();
  return (
    <div className="mvp-pages-reports__content">
      <Content />
    </div>
  );
};

function useGetReportsComponent(): FC {
  const { reports, activeFilters } = useReportsData();

  const { project, gateway } = activeFilters;


  const ContentComponent: FC = useMemo(() => {
  
    const EmptyComponent =
      REPORTS_LIST_COMPONENTS_BY_TYPE[REPORTS_LIST_TYPES_VALUES.EMPTY];

    if (_.isEmpty(reports)) {
      return EmptyComponent;
    }

    if (project === ALL_ITEMS_VALUE) {
      if (gateway === ALL_ITEMS_VALUE) {
        return REPORTS_LIST_COMPONENTS_BY_TYPE[
          REPORTS_LIST_TYPES_VALUES.ALL_PROJECTS_ALL_GATEWAYS
        ];
      } else {
        return REPORTS_LIST_COMPONENTS_BY_TYPE[
          REPORTS_LIST_TYPES_VALUES.ALL_PROJECTS_ONE_GATEWAY
        ];
      }
    } else {
      if (gateway === ALL_ITEMS_VALUE) {
        return REPORTS_LIST_COMPONENTS_BY_TYPE[
          REPORTS_LIST_TYPES_VALUES.ONE_PROJECT_ALL_GATEWAYS
        ];
      } else {
        return REPORTS_LIST_COMPONENTS_BY_TYPE[
          REPORTS_LIST_TYPES_VALUES.ONE_PROJECT_ONE_GATEWAY
        ];
      }
    }
  }, [reports, activeFilters]);

  return ContentComponent;
}

export { PageContent };
