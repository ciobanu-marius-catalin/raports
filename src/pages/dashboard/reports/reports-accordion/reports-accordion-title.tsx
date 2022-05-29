import {
  Accordion as ReactAccordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

const ReportsAccordionTitle = ({ label, total }) => {
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
