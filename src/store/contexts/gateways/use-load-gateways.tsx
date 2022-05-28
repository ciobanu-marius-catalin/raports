import { useCallback, useEffect, useState } from 'react';
import type { GatewayInterface } from '@repositories';
import { useErrorCatcher, ALL_ITEMS_VALUE, useDeepMemo } from '@core';
import { useGatewaysRepository } from '@repositories';
import type { OptionInterface } from '@components';
import type { GatewayContextInterface } from './index';
import _ from 'lodash';

const useLoadGateways = () => {
  const { setError } = useErrorCatcher();
  const repository = useGatewaysRepository();
  const [gateways, setGateways] = useState<GatewayInterface[]>([]);
  const [gatewayOptions, setGatewayOptions] = useState<OptionInterface[]>([]);

  const loadGateways = useCallback(async () => {
    try {
      const gateways: GatewayInterface[] = await repository.get();
      if (gateways && Array.isArray(gateways)) {
        setGateways(gateways);

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

  const labelsByValues = useDeepMemo(() => {
    const labelsByValues = {};
    gatewayOptions.forEach((item) => {
      // @ts-ignore
      labelsByValues[item.value] = item.label;
    });
    return labelsByValues;
  }, [gatewayOptions]);

  const itemsByValue = useDeepMemo(() => {
    return _.keyBy(gateways, (item) => item.gatewayId);
  }, [gateways]);

  const data: GatewayContextInterface = useDeepMemo(() => {
    return {
      labelsByValues,
      itemsByValue,
      items: gateways,
      options: gatewayOptions,
    };
  }, [gateways, gatewayOptions, labelsByValues, itemsByValue]);

  return data;
};

export { useLoadGateways };
