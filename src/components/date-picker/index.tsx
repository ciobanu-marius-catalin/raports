import ReactDatePicker from 'react-datepicker';
import { FC } from 'react';
import { DatePicker as DatePickerIcon } from '@icons';
interface Props {
  value: Date | undefined;
  onChange: Function;
  [key: string]: any;
}

const DatePicker: FC<Props> = ({
  value,
  onChange,
  placeholderOpenToDate,
  ...props
}) => {
  const openToDate = value ? value : placeholderOpenToDate;
  // @ts-ignore
  return (
    <div className="mvp-control mvp-control-date__wrapper">
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        type="button"
        wrapperClassName="mvp-control mvp-control-date"
        openToDate={openToDate}
        dateFormat="dd/MM/yyyy"
        {...props}
      />
      <DatePickerIcon />
    </div>
  );
};

export { DatePicker };
