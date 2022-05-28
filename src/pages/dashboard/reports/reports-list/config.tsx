const columnsNamesWithGateway = [
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

const columnsNamesWithoutGateway = columnsNamesWithGateway.filter(
  (item) => item.value !== 'gateway.name'
);

export { columnsNamesWithGateway, columnsNamesWithoutGateway };
