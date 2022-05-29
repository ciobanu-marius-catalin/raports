import React, { useContext } from 'react';
import { ProjectInterface } from '@repositories';
import { OptionInterface } from '@components';
import { useLoadGateways } from './use-load-gateways';

export interface GatewayContextInterface {
  items: ProjectInterface[];
  options: OptionInterface[];
  itemsByValue: object;
  labelsByValue: object;
}

const defaultContextValue: GatewayContextInterface = {
  items: [],
  options: [],
  itemsByValue: {},
  labelsByValue: {},
};

const GatewayContext = React.createContext(defaultContextValue);

const GatewaysContextProvider = ({ children }) => {
  const contextValue: GatewayContextInterface = useLoadGateways();
  return (
    <GatewayContext.Provider value={contextValue}>
      {children}
    </GatewayContext.Provider>
  );
};

const useGatewaysContext = () => {
  return useContext(GatewayContext);
};

export { useGatewaysContext, GatewaysContextProvider };
