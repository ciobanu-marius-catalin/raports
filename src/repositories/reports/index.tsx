import { useCallback, useMemo } from 'react';
import { axios } from '@core';

export interface ReportsInterface {
  projectId: string;
  gatewayId: string;
  userIds: string[];
  amount: number;
  created: string;
  modified: string;
  paymentId: string;
}

export interface ReportsRequestParamInterface {
  from: string | null;
  to: string | null;
  projectId: string | null;
  gatewayId: string | null;
}
export type ReportsRepositoryGetReportsInterface = (
  data: ReportsRequestParamInterface
) => Promise<ReportsInterface>;

export interface ReportsRepositoryInterface {
  getReports: ReportsRepositoryGetReportsInterface;
}

function useReportsRepository(): ReportsRepositoryInterface {
  const getReports = useCallback(
    async (data: ReportsRequestParamInterface): Promise<ReportsInterface[]> => {
      const item = await axios.post('/report', data);
      const reports: ReportsInterface[] = item?.data?.data || [];
      return reports;
    },
    []
  );

  const routes: ReportsRepositoryInterface = useMemo(() => {
    return {
      getReports,
    };
  }, [getReports]);

  return routes;
}

export { useReportsRepository };
