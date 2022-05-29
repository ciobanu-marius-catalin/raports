import React from 'react';

import { Accordion as ReactAccordion } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const Accordion = ({ children }) => {
  return (
    <ReactAccordion
      className="mvp-control mvp-control-accordion"
      preExpanded={[0]}
      allowZeroExpanded={true}
    >
      {children}
      {/*<AccordionItem>*/}
      {/*  <AccordionItemHeading>*/}
      {/*    <AccordionItemButton>*/}
      {/*      What harsh truths do you prefer to ignore?*/}
      {/*    </AccordionItemButton>*/}
      {/*  </AccordionItemHeading>*/}
      {/*  <AccordionItemPanel>*/}
      {/*    <p>*/}
      {/*      Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat*/}
      {/*      occaecat ut occaecat consequat est minim minim esse tempor laborum*/}
      {/*      consequat esse adipisicing eu reprehenderit enim.*/}
      {/*    </p>*/}
      {/*  </AccordionItemPanel>*/}
      {/*</AccordionItem>*/}
    </ReactAccordion>
  );
};

export { Accordion };
