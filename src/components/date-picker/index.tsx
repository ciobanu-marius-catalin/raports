import ReactDatePicker from 'react-datepicker';
import { FC } from 'react';
import { DatePicker as DatePickerIcon} from '@icons';
interface Props {
  value: Date | undefined;
  onChange: Function;
  [key: string]: any;
}

const DatePicker: FC<Props> = ({ value, onChange, ...props }) => {
  // @ts-ignore
  return (
    <div className="mvp-control mvp-control-date__wrapper">
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        type="button"
        wrapperClassName="mvp-control mvp-control-date"
        {...props}
      />
      <DatePickerIcon />
    </div>
  );
};

export { DatePicker };
