import { useEffect, useState } from 'react';
import Input, { Props as InputProps } from '../input/Input'; 

interface InputMoneyProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DECIMAL_SIZE = 2;

const InputMoney = ({ value, onChange, ...props }: InputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState<string>('0,00');

  useEffect(() => {
    const valueString = `${value}`;
    if (!isNaN(parseFloat(valueString))) {
      setCurrentValue(Number(value).toFixed(DECIMAL_SIZE).replace('.', ','));
    }
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueRemoved = event.target.value.replace(/\D/g, '');
    if (valueRemoved === '') {
      onChange({ ...event, target: { ...event.target, value: '0.00' } });
      return;
    }
    const newValueNumber = Number(valueRemoved) / 100;
    const newValueString = newValueNumber.toFixed(DECIMAL_SIZE);
    onChange({
      ...event,
      target: { ...event.target, value: newValueString },
    });
  };

  return (
    <Input 
      addonBefore="R$" 
      value={currentValue} 
      onChange={handleOnChange} 
      {...props}
    />
  );
};

export default InputMoney;