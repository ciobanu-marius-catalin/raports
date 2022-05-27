import { useCallback, useMemo } from 'react';
import { axios } from '@core';
import { UserInterface, UserRepositoryGetItemInterface } from '@repositories';

export interface ReportsInterface {
  // projectId: string;
  userIds: string[];
  // rule: string;
  // gatewaysIds: string[];
  // structure: string;
  // industry: string;
  // website: string;
  // description: string;
  // image: string;
  // name: string;
}

export interface ReportsRequestParamInterface {
  from: string | null;
  to: string | null;
  projectId: string | null;
  gatewayId: string | null;
}
export type ReportsRepositoryGetReportsInterface = (
  data: ReportsRequestParamInterface
) => Promise<{
  data: {
    data: ReportsInterface;
  };
}>;

export interface ReportsRepositoryInterface {
  getReports: ReportsRepositoryGetReportsInterface;
}

function useReportsRepository(): ReportsRepositoryInterface {
  const getReports = useCallback(async (data): Promise<ReportsInterface[]> => {
    const item = await axios.post('/reports', data);
    return item?.data?.data || [];
  }, []);

  const routes: ReportsRepositoryInterface = useMemo(() => {
    return {
      getReports,
    };
  }, [getReports]);

  return routes;
}

export { useReportsRepository };
