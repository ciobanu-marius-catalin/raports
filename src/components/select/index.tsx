import { FC, useCallback } from 'react';
import ReactSelect, { components } from 'react-select';
import { DownArrow } from '@icons';
import { useDeepMemo } from '@core';

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
  const { onChange, options, value } = props;
  const onInternalChange = useCallback(
    (newValue: OptionInterface) => {
      onChange(newValue.value);
    },
    [onChange]
  );
  const internalValue = useDeepMemo(() => {
    return options.find((option) => option.value === value);
  }, [value, options]);
  // @ts-ignore
  return (
    <ReactSelect
      className="mvp-control mvp-control-select"
      classNamePrefix="mvp-control-select"
      components={{ DropdownIndicator }}
      {...props}
      onChange={onInternalChange}
      value={internalValue}
    />
  );
};

export { Select };
