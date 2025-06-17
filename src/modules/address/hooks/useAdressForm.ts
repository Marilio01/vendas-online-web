import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCorreios } from './useCorreios';

interface AddressFormState {
  cep: string;
  street: string;
  neighborhood: string;
  numberAddress: string;
  complement: string;
  stateId?: number;
  cityId?: number;
}

interface AddressFormErrors {
  cep?: string;
  street?: string;
  neighborhood?: string;
  numberAddress?: string;
  complement?: string;
  stateId?: string;
  cityId?: string;
}

type TouchedFields = Partial<Record<keyof AddressFormState, boolean>>;

const INITIAL_STATE: AddressFormState = {
  cep: '',
  street: '',
  neighborhood: '',
  numberAddress: '',
  complement: '',
  stateId: undefined,
  cityId: undefined,
};

export const useAddressForm = (
  fetchCities?: (stateId: number) => void,
) => {
  const [address, setAddress] = useState<AddressFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<AddressFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
  const [isAddressReadOnly, setIsAddressReadOnly] = useState(true);
  const { fetchCep } = useCorreios();

  useEffect(() => {
    const cepValue = address.cep.replace(/\D/g, '');
    if (cepValue.length !== 8) {
      return;
    }
    if (fetchCities) {
      fetchCep(cepValue)
        .then((data) => {
          if (data && data.stateId && data.cityId) {
            setIsAddressReadOnly(!!data.publicPlace);
            setAddress(prev => ({
              ...prev,
              stateId: data.stateId,
              cityId: data.cityId,
              street: data.publicPlace || '',
              neighborhood: data.neighborhood || '',
              complement: '', numberAddress: ''
            }));
            fetchCities(data.stateId);
          }
        })
        .catch(() => { /* ... */ });
    }
  }, [address.cep, fetchCities, fetchCep]);

  useEffect(() => {
    const newErrors: AddressFormErrors = {};

    if (touchedFields.cep && (!address.cep || address.cep.length !== 8)) {
      newErrors.cep = 'CEP inválido.';
    }

    if (touchedFields.numberAddress && (!address.numberAddress || Number(address.numberAddress) <= 0)) {
      newErrors.numberAddress = 'Número é obrigatório.';
    }

    if (touchedFields.street && !address.street) {
      newErrors.street = 'Rua é obrigatória.';
    }

    if (touchedFields.neighborhood && !address.neighborhood) {
      newErrors.neighborhood = 'Bairro é obrigatório.';
    }

    if (touchedFields.stateId && !address.stateId) {
      newErrors.stateId = 'Estado é obrigatório.';
    }

    if (touchedFields.cityId && !address.cityId) {
      newErrors.cityId = 'Cidade é obrigatória.';
    }

    setErrors(currentErrors => {
      const updatedErrors = { ...currentErrors };
      Object.keys(newErrors).forEach(key => delete updatedErrors[key as keyof AddressFormErrors]);
      return { ...updatedErrors, ...newErrors };
    });
  }, [address, touchedFields]);

  const disabledButton = useMemo(() => {
    return !(
      address.cep.length === 8 &&
      address.stateId &&
      address.cityId &&
      address.street &&
      address.neighborhood &&
      address.numberAddress &&
      Number(address.numberAddress) > 0
    );
  }, [address]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: keyof AddressFormState) => {
    setAddress(prev => ({ ...prev, [name]: event.target.value }));
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
    setIsAddressReadOnly(true);
  }, []);

  return {
    address,
    errors,
    disabledButton,
    isAddressReadOnly,
    handleOnChangeInput,
    handleChangeSelect,
    handleOnBlur,
    resetForm,
  };
};
