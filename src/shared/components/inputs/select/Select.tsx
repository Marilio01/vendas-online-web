import { Select as SelectAntd, SelectProps } from 'antd';
import { BoxSelect, ErrorMessage, TitleSelect } from './select.styles';

interface Props extends SelectProps {
  title?: string;
  errorMessage?: string;
  margin?: string;
}

const Select = ({ title, errorMessage, margin, ...props }: Props) => {
  return (
    <BoxSelect style={{ margin }}>
      {title && <TitleSelect>{title}</TitleSelect>}
      <SelectAntd
        style={{ width: '100%' }}
        status={errorMessage ? 'error' : ''}
        {...props}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </BoxSelect>
  );
};

export default Select;