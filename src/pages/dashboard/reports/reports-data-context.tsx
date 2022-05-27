import {
  createContext,
  FC,
  useState,
  useMemo,
  ReactNode,
  useContext,
  useCallback,
} from 'react';
import _ from 'lodash';
import {
  GatewayInterface,
  ReportsInterface,
  useReportsRepository,
} from '@repositories';
import { useErrorCatcher } from '@core';

interface ReportsDataInterface {
  project: string | null;
  setProject: Function;
  gateway: string | null;
  setGateway: Function;
  startDate: Date | null;
  setStartDate: Function;
  endDate: Date | null;
  setEndDate: Function;
  reports: object[];
  setReports: Function;
  loadReports: Function;
}

const defaultValue: ReportsDataInterface = {
  project: null,
  setProject: _.noop,
  gateway: null,
  setGateway: _.noop,
  startDate: null,
  setStartDate: _.noop,
  endDate: null,
  setEndDate: _.noop,
  reports: [],
  setReports: _.noop,
  loadReports: _.noop,
};

interface PropsInterface {
  children: ReactNode;
}

const ReportsDataContext = createContext(defaultValue);

const ReportsDataProvider: FC<PropsInterface> = ({ children }) => {
  const [project, setProject] = useState<string | null>(null);
  const [gateway, setGateway] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { setError } = useErrorCatcher();
  const [reports, setReports] = useState<ReportsInterface[]>([]);

  const reportsRepository = useReportsRepository();

  const loadReports = useCallback(async () => {
    try {
      const reportsData = await reportsRepository.getReports({
        projectId: project,
        gatewayId: gateway,
        from: startDate,
        to: endDate,
      });
      const items = reportsData?.data?.data || [];
      if (!_.isEmpty(items)) {
        setReports(items);
      }
    } catch (e) {
      setError(e);
    }
  }, [project, gateway, startDate, endDate]);

  const contextValue: ReportsDataInterface = useMemo(() => {
    return {
      project,
      setProject,
      gateway,
      setGateway,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      reports,
      setReports,
      loadReports,
    };
  }, [
    project,
    setProject,
    gateway,
    setGateway,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
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
export { ReportsDataProvider, useReportsData };
