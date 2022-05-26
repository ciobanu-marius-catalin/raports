import ReactDatePicker, {} from 'react-datepicker';
import { FC } from 'react';

interface Props {
  value: Date | undefined;
  onChange: Function;
}

const DatePicker: FC<Props> = ({ value, onChange }) => {
  // @ts-ignore
  return <ReactDatePicker selected={value} onChange={onChange} />;
};

export { DatePicker };
