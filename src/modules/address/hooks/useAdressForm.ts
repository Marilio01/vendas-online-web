import { useState, useEffect, useMemo, useCallback  } from 'react';
import { AddressType } from '../../../shared/types/AddressType';

interface AddressFormState {
  cep: string;
  numberAddress: string;
  complement: string;
  stateId?: number;
  cityId?: number;
}
interface AddressFormErrors {
  cep?: string;
  numberAddress?: string;
  complement?: string;
  stateId?: string;
  cityId?: string;
}
type TouchedFields = Partial<Record<keyof AddressFormState, boolean>>;

const INITIAL_STATE: AddressFormState = {
  cep: '',
  numberAddress: '',
  complement: '',
  stateId: undefined,
  cityId: undefined,
};

export const useAddressForm = (addressToEdit?: AddressType) => {
  const [address, setAddress] = useState<AddressFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<AddressFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});

useEffect(() => {
  if (addressToEdit) {
    const newAddress = {
      cep: addressToEdit.cep.replace(/\D/g, ''),
      numberAddress: String(addressToEdit.numberAddress),
      complement: addressToEdit.complement,
      stateId: addressToEdit.city?.state?.id,
      cityId: addressToEdit.city?.id,
    };

    setAddress(prev => {
      if (JSON.stringify(prev) === JSON.stringify(newAddress)) {
        return prev;
      }
      return newAddress;
    });
  }
}, [addressToEdit]);

  useEffect(() => {
    const newErrors: AddressFormErrors = {};
    const trimmedComplement = address.complement.trim();

    if (touchedFields.cep && (!address.cep || address.cep.length < 8)) {
      newErrors.cep = 'CEP deve ter 8 dígitos.';
    }
    if (touchedFields.stateId && !address.stateId) {
      newErrors.stateId = 'Estado é obrigatório.';
    }
    if (touchedFields.cityId && !address.cityId) {
      newErrors.cityId = 'Cidade é obrigatória.';
    }
    if (touchedFields.complement) {
      if (!trimmedComplement) {
        newErrors.complement = 'Complemento é obrigatório.';
      } else if (address.complement !== trimmedComplement) {
        newErrors.complement = 'Não pode conter espaços extras.';
      } else if (trimmedComplement.length < 3) {
        newErrors.complement = 'Deve ter no mínimo 3 caracteres.';
      }
    }
    if (touchedFields.numberAddress) {
      if (!address.numberAddress) {
        newErrors.numberAddress = 'Número é obrigatório.';
      } else if (Number(address.numberAddress) <= 0) {
        newErrors.numberAddress = 'Número inválido.';
      }
    }

    setErrors(newErrors);
  }, [address, touchedFields]);

  const disabledButton = useMemo(() => {
    const trimmedComplement = address.complement.trim();
    return !(
      address.cep.length === 8 &&
      address.stateId &&
      address.cityId &&
      trimmedComplement.length >= 3 &&
      address.complement === trimmedComplement &&
      Number(address.numberAddress) > 0
    );
  }, [address]);

  const handleOnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof AddressFormState
  ) => {
    let value = event.target.value;
    if (name === 'cep' || name === 'numberAddress') {
      value = value.replace(/\D/g, '');
    }
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeSelect = (value: number | undefined, name: keyof AddressFormState) => {
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleOnBlur = (name: keyof AddressFormState) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };

  const resetForm = useCallback(() => {
    setAddress(INITIAL_STATE);
    setTouchedFields({});
    setErrors({});
  }, []); 

  return {
    address,
    errors,
    disabledButton,
    handleOnChangeInput,
    handleChangeSelect,
    handleOnBlur,
    resetForm,
  };
};
