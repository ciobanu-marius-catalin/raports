import { AllProjectsAllGateways } from './reports-list/all-projects-all-gateways';
import { AllProjectsOneGateway } from './reports-list/all-projects-one-gateway';
import { OneProjectAllGateway } from './reports-list/one-project-all-gateway';
import { OneProjectOneGateway } from './reports-list/one-project-one-gateway';
import { EmptyContent } from './reports-list/empty-content';
import { FC } from 'react';
import { ALL_ITEMS_VALUE } from '@core';

interface ReportsListComponentByTypeInterface {
  [key: string]: FC;
}

const REPORTS_LIST_TYPES_VALUES = {
  EMPTY: 'empty',
  ALL_PROJECTS_ALL_GATEWAYS: 'allProjectsAllGateways',
  ALL_PROJECTS_ONE_GATEWAY: 'allProjectsOneGateways',
  ONE_PROJECT_ALL_GATEWAYS: 'oneProjectAllGateways',
  ONE_PROJECT_ONE_GATEWAY: 'oneProjectOneGateway',
};

const REPORTS_LIST_COMPONENTS_BY_TYPE: ReportsListComponentByTypeInterface = {
  [REPORTS_LIST_TYPES_VALUES.EMPTY]: EmptyContent,
  [REPORTS_LIST_TYPES_VALUES.ALL_PROJECTS_ALL_GATEWAYS]: AllProjectsAllGateways,
  [REPORTS_LIST_TYPES_VALUES.ALL_PROJECTS_ONE_GATEWAY]: AllProjectsOneGateway,
  [REPORTS_LIST_TYPES_VALUES.ONE_PROJECT_ALL_GATEWAYS]: OneProjectAllGateway,
  [REPORTS_LIST_TYPES_VALUES.ONE_PROJECT_ONE_GATEWAY]: OneProjectOneGateway,
};

export {
  ALL_ITEMS_VALUE,
  REPORTS_LIST_TYPES_VALUES,
  REPORTS_LIST_COMPONENTS_BY_TYPE,
};
