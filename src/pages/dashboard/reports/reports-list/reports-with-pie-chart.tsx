import { Card } from '@components';
import { ReportsAccordion } from '../reports-accordion';
import { ReportTitle } from './report-title';
import { Chart } from 'react-google-charts';
import { chartColors } from './config';
import { useDeepMemo } from '@core';
import _ from 'lodash';

const options = {
  colors: chartColors,
  legend: 'none',
};

const ReportsWithPieChart = ({
  groupedReports,
  totalSum,
  columnsNames,
  totalLabel = 'Total',
}) => {
  const chartData = useDeepMemo(() => {
    const data = groupedReports.map((item) => {
      return [item.label, item.amount];
    });
    data.unshift(['Payments', 'amount']);
    return data;
  }, [groupedReports]);

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
