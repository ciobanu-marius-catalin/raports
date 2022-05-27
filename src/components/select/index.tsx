import { FC } from 'react';
import ReactSelect, { components } from 'react-select';
import { DownArrow } from '@icons';

export interface OptionInterface {
  label: string;
  value: string;
}

interface Props {
  options: OptionInterface[];
  value: string | number | undefined;
  onChange: Function;
}

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <DownArrow />
    </components.DropdownIndicator>
  );
};

const Select: FC<Props> = (props) => {
  // @ts-ignore
  return (
    <ReactSelect
      className="mvp-control mvp-control-select"
      classNamePrefix="mvp-control-select"
      components={{ DropdownIndicator }}
      {...props}
    />
  );
};

export { Select };
