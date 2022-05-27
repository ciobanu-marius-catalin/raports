import { useCallback, useEffect, useState } from 'react';
import type { GatewayInterface } from '@repositories';
import { useErrorCatcher } from '@core';
import { useGatewaysRepository } from '@repositories';
import type { OptionInterface } from '@components';
import { ALL_ITEMS_VALUE } from './config';

const useLoadGateways = () => {
  const { setError } = useErrorCatcher();
  const repository = useGatewaysRepository();
  const [gatewayOptions, setGatewayOptions] = useState<OptionInterface[]>([]);

  const loadGateways = useCallback(async () => {
    try {
      const gateways: GatewayInterface[] = await repository.get();
      if (gateways && Array.isArray(gateways)) {
        const options = gateways.map((item) => {
          return {
            value: item.gatewayId,
            label: item.name,
          };
        });

        options.unshift({
          label: 'All gateways',
          value: ALL_ITEMS_VALUE,
        });

        setGatewayOptions(options);
      }
    } catch (e) {
      setError(e);
    }
  }, [repository]);

  useEffect(() => {
    loadGateways();
  }, []);

  return gatewayOptions;
};

export { useLoadGateways };
