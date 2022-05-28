import { Accordion } from '@components';
import { AccordionItem, AccordionItemPanel } from 'react-accessible-accordion';
import { ReportsAccordionTitle } from './reports-accordion-title';
import { ReportsTable } from '../reports-table';
import { FC } from 'react';

const ReportsAccordion: FC = ({ groupedReports = [], columnsNames = [] }) => {
  return (
    <div className="mvp-pages-reports__accordion ">
      <Accordion>
        {groupedReports.map(({ label, value, items, amount }) => (
          <AccordionItem key={value}>
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
