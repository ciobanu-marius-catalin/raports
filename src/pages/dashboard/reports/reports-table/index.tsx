import { useDeepMemo } from '@core';
import _ from 'lodash';
import { ReportsInterface } from '@repositories';
import { OptionInterface } from '@components';
import { FC } from 'react';

interface ReportsTableParamsInterface {
  items: ReportsInterface[];
  columnsNames: OptionInterface[];
}

const ReportsTable: FC<ReportsTableParamsInterface> = ({
  items = [],
  columnsNames = [],
}) => {
  const columnNamesLabels: string[] = useDeepMemo(() => {
    return columnsNames.map((item) => item.label);
  }, [columnsNames]);
  return (
    <table className="mvp-pages-reports__table">
      <thead>
        <tr>
          {columnNamesLabels.map((label) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {columnsNames.map(({ value: columnName }) => {
              const cellValue = _.get(item, columnName);
              const formattedCellValue = formatTableCell(columnName, cellValue);
              return <td key={columnName}>{formattedCellValue}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function formatTableCell(key, value) {
  if (key === 'amount') {
    return `${value} USD`;
  }

  return value;
}

export { ReportsTable };
