import type { CrudRepositoryInterface } from '../common';
import { useCrud } from '../common';

export interface GatewayInterface {
  gatewayId: string;
  userIds: string[];
  description: string;
  secondaryApiKey: string;
  apiKey: string;
  type: string;
  name: string;
}

export type GatewayRepositoryInterface =
  CrudRepositoryInterface<GatewayInterface>;

function useGatewaysRepository(): GatewayRepositoryInterface {
  const routes: GatewayRepositoryInterface =
    useCrud<GatewayInterface>('/gateways');
  return routes;
}

export { useGatewaysRepository };
