import type { OptionInterface } from '@components';

const columnsNamesWithGateway: OptionInterface[] = [
  {
    label: 'Date',
    value: 'created',
  },
  {
    label: 'Gateway',
    value: 'gateway.name',
  },
  {
    label: 'Transaction ID',
    value: 'paymentId',
  },
  {
    label: 'Amount',
    value: 'amount',
  },
];

const columnsNamesWithoutGateway: OptionInterface[] =
  columnsNamesWithGateway.filter((item) => item.value !== 'gateway.name');

//colors used by google charts
const chartColors = [
  '#3366cc',
  '#dc3912',
  '#ff9900',
  '#109618',
  '#990099',
  '#0099c6',
  '#dd4477',
  '#66aa00',
  '#b82e2e',
  '#316395',
  '#994499',
  '#22aa99',
  '#aaaa11',
  '#6633cc',
  '#e67300',
  '#8b0707',
  '#651067',
  '#329262',
  '#5574a6',
  '#3b3eac',
  '#b77322',
  '#16d620',
  '#b91383',
  '#f4359e',
  '#9c5935',
  '#a9c413',
  '#2a778d',
  '#668d1c',
  '#bea413',
  '#0c5922',
  '#743411',
];

export { columnsNamesWithGateway, columnsNamesWithoutGateway, chartColors };
