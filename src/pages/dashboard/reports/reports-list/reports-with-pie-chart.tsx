import { Card, OptionInterface } from '@components';
import { ReportsAccordion } from '../reports-accordion';
import { ReportTitle } from './report-title';
import { Chart } from 'react-google-charts';
import { chartColors } from './config';
import { useDeepMemo } from '@core';
import _ from 'lodash';
import { useWindowWidth } from '@react-hook/window-size';
import { FC, useEffect, useState } from 'react';
import { GroupedReportsInterface } from './use-get-grouped-data';

const options = {
  colors: chartColors,
  legend: 'none',
};

interface ReportsWithPieChartParamsInterface {
  groupedReports: GroupedReportsInterface[];
  totalSum: number;
  columnsNames: OptionInterface[];
  totalLabel: string;
}

const ReportsWithPieChart: FC<ReportsWithPieChartParamsInterface> = ({
  groupedReports,
  totalSum,
  columnsNames,
  totalLabel = 'Total',
}) => {
  const [chartKey, setChartKey] = useState();
  const chartData = useDeepMemo(() => {
    const data = groupedReports.map((item) => {
      return [item.label, item.amount];
    });
    data.unshift(['Payments', 'amount']);
    return data;
  }, [groupedReports]);

  const windowWidth = useWindowWidth();

  //the google chart does not handle ok window resizes. We force a rerender when this happens
  useEffect(() => {
    setChartKey(new Date().toString());
  }, [windowWidth]);

  return (
    <div className="mvp-pages-reports__content--with-chart-layout">
      <div className="mvp-pages-reports__content--with-chart-layout__left">
        <Card>
          <ReportTitle />
          <ReportsAccordion
            columnsNames={columnsNames}
            groupedReports={groupedReports}
          />
        </Card>
      </div>
      <div className="mvp-pages-reports__content--with-chart-layout__right">
        <ChartLegend groupedReports={groupedReports} />
        <Chart
          key={chartKey}
          options={options}
          chartType="PieChart"
          data={chartData}
          width={'100%'}
          height={'450px'}
        />
        <Card>
          <span className="bold-text ">
            {totalLabel} | {totalSum} USD
          </span>
        </Card>
      </div>
    </div>
  );
};

function ChartLegend({ groupedReports = [] }) {
  const data = useDeepMemo(() => {
    return groupedReports.map((groupReport, index) => {
      return {
        color: _.get(chartColors, index),
        label: groupReport.label,
      };
    });
  }, [groupedReports]);

  return (
    <Card className="mvp-pages-reports__chart-legend-item__container">
      {data.map((item, index) => (
        <ChartLegendItem key={index} {...item} />
      ))}
    </Card>
  );
}

function ChartLegendItem({ label, color }) {
  const colorStyle = {
    backgroundColor: color,
  };
  return (
    <div className="mvp-pages-reports__chart-legend-item">
      <div
        style={colorStyle}
        className="mvp-pages-reports__chart-legend-item__color"
      />
      <div className="mvp-pages-reports__chart-legend-item__label">{label}</div>
    </div>
  );
}

export { ReportsWithPieChart };
