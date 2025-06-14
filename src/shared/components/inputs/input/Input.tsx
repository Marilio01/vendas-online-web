import { Input as InputAntd, InputProps } from 'antd';
import { BoxInput, ErrorMessage, TitleInput } from './input.styles';

export interface Props extends InputProps {
  title?: string;
  errorMessage?: string;
  margin?: string;
}

const Input = ({ title, errorMessage, margin, ...props }: Props) => {
  return (
    <BoxInput style={{ margin }}>
      {title && <TitleInput>{title}</TitleInput>}
      <InputAntd
        status={errorMessage ? 'error' : ''}
        {...props}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </BoxInput>
  );
};

export default Input;