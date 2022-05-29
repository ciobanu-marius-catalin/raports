import {
  Accordion as ReactAccordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { FC } from 'react';

interface Props {
  label: string;
  total: number | undefined;
}

const ReportsAccordionTitle: FC<Props> = ({ label, total }) => {
  return (
    <AccordionItemHeading>
      <AccordionItemButton>
        <div className="mvp-pages-reports__accordion__title">
          <span>{label}</span>
          <span>TOTAL: {total?.toLocaleString()} USD</span>
        </div>
      </AccordionItemButton>
    </AccordionItemHeading>
  );
};

export { ReportsAccordionTitle };
