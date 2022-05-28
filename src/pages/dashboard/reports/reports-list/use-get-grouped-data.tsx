import { useDeepMemo } from '@core';
import { useReportsData } from '../reports-data-context';
import _ from 'lodash';

const useGetGroupedData = ({ groupByKey }) => {
  const { reports } = useReportsData();

  const objectUsedForGroup = groupByKey === 'projectId' ? 'project' : 'gateway';

  const reportsByGroupObj = useDeepMemo(() => {
    const groupedData = {};

    const addItem = (groupValue, item) => {
      if (!_.get(groupedData, groupValue)) {
        const newItem = {
          //we added the project/gateway object inside the reports result like an ORM 1:M relationship
          label: _.get(item, [objectUsedForGroup, 'name']),
          value: groupValue,
          items: [],
        };
        _.set(groupedData, groupValue, newItem);
      }
      groupedData[groupValue]?.items?.push(item);
    };

    reports.forEach((report) => {
      const groupValue = _.get(report, groupByKey);
      addItem(groupValue, report);
    });

    return groupedData;
  }, [reports]);

  const reportsByGroupArraySorted = useDeepMemo(() => {
    const groups = Object.values(reportsByGroupObj);
    const sortedGroups = _.sortBy(groups, (item) => item.label);
    sortedGroups.forEach((group) => {
      const groupItems = _.get(group, 'items', []);
      const sortedGroupItems = _.sortBy(groupItems, (item) => item.created);
      _.set(group, 'items', sortedGroupItems);
    });

    //compute the amount per group
    sortedGroups.forEach((group) => {
      let groupSum = 0;
      const groupItems = group?.items || [];
      groupItems.forEach((item) => {
        const amount = item?.amount;
        if (!isNaN(amount)) {
          groupSum += amount;
        }
      });

      group.amount = groupSum;
    });
    return sortedGroups;
  }, reportsByGroupObj);

  const totalSum = useDeepMemo(() => {
    let totalSum = 0;
    reportsByGroupArraySorted.forEach(({ amount }) => {
      if (!isNaN(amount)) {
        totalSum += amount;
      }
    });
    return totalSum?.toLocaleString();
  }, [reportsByGroupArraySorted]);

  return { groupedReports: reportsByGroupArraySorted, totalSum };
};

export { useGetGroupedData };
