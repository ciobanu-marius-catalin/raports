import {
  createContext,
  FC,
  useState,
  useMemo,
  ReactNode,
  useContext,
  useCallback,
  useReducer,
} from 'react';
import _ from 'lodash';
import { useReportsRepository } from '@repositories';
import type {
  ReportsInterface,
  ReportsRequestParamInterface,
} from '@repositories';
import { useDeepCallback, useErrorCatcher } from '@core';
import { ALL_ITEMS_VALUE } from './config';
import moment from 'moment';
import { useGatewaysContext, useProjectsContext } from '@store';

interface ReportsDataInterface {
  filters: FiltersInterface;
  activeFilters: FiltersInterface;
  getFilter: Function;
  setFilter: Function;
  reports: object[];
  setReports: Function;
  loadReports: Function;
}

interface PropsInterface {
  children: ReactNode;
}

interface FiltersInterface {
  project: string | undefined;
  gateway: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const defaultFiltersOnGenerate = {
  project: ALL_ITEMS_VALUE,
  gateway: ALL_ITEMS_VALUE,
  startDate: new Date('2021-01-01'),
  endDate: new Date('2021-12-31'),
};

const defaultFilters: FiltersInterface = {
  project: undefined,
  gateway: undefined,
  startDate: undefined,
  endDate: undefined,
};

const defaultContextValue: ReportsDataInterface = {
  filters: defaultFilters,
  activeFilters: defaultFilters,
  getFilter: _.noop,
  setFilter: _.noop,
  reports: [],
  setReports: _.noop,
  loadReports: _.noop,
};

const ReportsDataContext = createContext(defaultContextValue);

const ReportsDataProvider: FC<PropsInterface> = ({ children }) => {
  const [reports, setReports] = useState<ReportsInterface[]>([]);

  const [filters, setInternalFilters] =
    useState<FiltersInterface>(defaultFilters);
  const [activeFilters, setActiveFilters] =
    useState<FiltersInterface>(defaultFilters);

  const { itemsByValue: gatewayItemsByValue } = useGatewaysContext();
  const { itemsByValue: projectItemsByValue } = useProjectsContext();
  const { setError } = useErrorCatcher();

  const setFilter = useCallback(
    (path: string) => (value: any) => {
      const newFilters = _.cloneDeep(filters);
      _.set(newFilters, path, value);
      setInternalFilters(newFilters);
    },
    [filters, setInternalFilters]
  );

  const getFilter = useCallback(
    (path: string, defaultValue: any) => {
      return _.get(filters, path, defaultValue);
    },
    [filters]
  );

  const getFiltersWithDefault = useCallback(() => {
    const mergedFilters = _.merge({}, defaultFiltersOnGenerate, filters);
    setInternalFilters(mergedFilters);
    if (!_.isEqual(mergedFilters, filters)) {
      setInternalFilters(mergedFilters);
    }
    return mergedFilters;
  }, [filters, setInternalFilters]);

  const getReportsParamsFromFilters = useCallback(
    (filtersWithDefault: FiltersInterface): ReportsRequestParamInterface => {
      const { project, gateway, startDate, endDate }: FiltersInterface =
        filtersWithDefault;
      const momentFormat = 'YYYY-MM-DD';

      const handleAllItemsValue = (value) => {
        if (value == ALL_ITEMS_VALUE) {
          return undefined;
        }

        return value;
      };

      const filters: ReportsRequestParamInterface = {
        projectId: handleAllItemsValue(project),
        gatewayId: handleAllItemsValue(gateway),
        from: moment(startDate).format(momentFormat),
        to: moment(endDate).format(momentFormat),
      };

      return filters;
    },
    [filters]
  );

  const reportsRepository = useReportsRepository();

  const loadReports = useDeepCallback(async () => {
    try {
      const filtersWithDefault: FiltersInterface = getFiltersWithDefault();
      const paramsFromFilters: ReportsRequestParamInterface =
        getReportsParamsFromFilters(filtersWithDefault);
      // @ts-ignore
      const items: ReportsInterface[] = await reportsRepository.getReports(
        paramsFromFilters
      );

      if (Array.isArray(items)) {
        const formattedItems = formatReports({
          reports: items,
          gatewayItemsByValue,
          projectItemsByValue,
        });
        setReports(formattedItems);
      }

      //set what filters are active;
      setActiveFilters(filtersWithDefault);
    } catch (e) {
      setError(e);
    }
  }, [
    gatewayItemsByValue,
    projectItemsByValue,
    getReportsParamsFromFilters,
    getFiltersWithDefault,
    reportsRepository,
    setReports,
    setError,
    setActiveFilters,
  ]);

  const contextValue: ReportsDataInterface = useMemo(() => {
    return {
      activeFilters,
      filters,
      getFilter,
      setFilter,
      reports,
      setReports,
      loadReports,
    };
  }, [
    activeFilters,
    filters,
    getFilter,
    setFilter,
    reports,
    setReports,
    loadReports,
  ]);

  return (
    <ReportsDataContext.Provider value={contextValue}>
      {children}
    </ReportsDataContext.Provider>
  );
};

const useReportsData = (): ReportsDataInterface => {
  return useContext(ReportsDataContext);
};
export interface ReportsInterface {
  projectId: string;
  gatewayId: string;
  userIds: string[];
  amount: number;
  created: string;
  modified: string;
  paymentId: string;
}
function formatReports({
  reports = [],
  gatewayItemsByValue = {},
  projectItemsByValue = {},
}) {
  return reports.map((item: ReportsInterface) => {
    return {
      ...item,
      created: moment(item?.created).format('DD/MM/YYYY'),
      amount: Math.round(item?.amount),
      gateway: _.get(gatewayItemsByValue, item.gatewayId),
      project: _.get(projectItemsByValue, item.projectId),
    };
  });
}

export { ReportsDataProvider, useReportsData };
