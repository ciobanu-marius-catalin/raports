import { FC } from 'react';
import ReactSelect from 'react-select';

interface OptionInterface {
  label: string;
  value: string;
}

interface Props {
  options: OptionInterface[];
  value: string | number | undefined;
  onChange: Function;
}

const Select: FC<Props> = (props) => {
  // @ts-ignore
  return <ReactSelect {...props} />;
};

export { Select };
