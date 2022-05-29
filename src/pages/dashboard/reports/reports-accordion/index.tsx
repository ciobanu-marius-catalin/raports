import { Accordion, OptionInterface } from '@components';
import { AccordionItem, AccordionItemPanel } from 'react-accessible-accordion';
import { ReportsAccordionTitle } from './reports-accordion-title';
import { ReportsTable } from '../reports-table';
import { FC } from 'react';
import type { GroupedReportsInterface } from '../reports-list/use-get-grouped-data';

interface ReportsAccordionInterface {
  groupedReports: GroupedReportsInterface[];
  columnsNames: OptionInterface[];
}

const ReportsAccordion: FC<ReportsAccordionInterface> = ({
  groupedReports = [],
  columnsNames = [],
}) => {
  return (
    <div className="mvp-pages-reports__accordion ">
      <Accordion>
        {groupedReports.map(({ label, value, items, amount }, index) => (
          <AccordionItem key={value} uuid={index}>
            <ReportsAccordionTitle label={label} total={amount} />
            <AccordionItemPanel>
              <ReportsTable items={items} columnsNames={columnsNames} />
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export { ReportsAccordion };
