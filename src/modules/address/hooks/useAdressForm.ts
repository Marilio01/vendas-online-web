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
  const [cepApiError, setCepApiError] = useState<string | undefined>();
  const { fetchCep } = useCorreios();

  useEffect(() => {
    const cepValue = address.cep.replace(/\D/g, '');
    
    setCepApiError(undefined);

    if (cepValue.length !== 8) {
      setAddress(prev => ({
        ...prev,
        street: '',
        neighborhood: '',
        stateId: undefined,
        cityId: undefined,
      }));
      setIsAddressReadOnly(true);
      return;
    }

    // Chamamos fetchCep com a opção para suprimir a notificação global
    fetchCep(cepValue, { showGlobalError: false })
      .then((data) => {
        if (data?.stateId && data?.cityId) {
          setIsAddressReadOnly(!!data.publicPlace);
          setAddress(prev => ({
            ...prev,
            stateId: data.stateId,
            cityId: data.cityId,
            street: data.publicPlace || '',
            neighborhood: data.neighborhood || '',
          }));
          fetchCities?.(data.stateId);
        } else {
          setCepApiError('CEP não encontrado.');
          setIsAddressReadOnly(false);
        }
      })
      .catch(() => {
        setCepApiError('CEP inválido.');
        setIsAddressReadOnly(false);
      });
  }, [address.cep, fetchCep, fetchCities]);

  const validate = useCallback((formState: AddressFormState): AddressFormErrors => {
    const newErrors: AddressFormErrors = {};
    const cepValue = formState.cep.replace(/\D/g, '');

    if (!cepValue || cepValue.length !== 8) {
      newErrors.cep = 'CEP deve conter 8 dígitos.';
    }

    if (!formState.street.trim()) {
      newErrors.street = 'Rua é obrigatória.';
    } else if (formState.street.trim().length < 3) {
      newErrors.street = 'Rua deve ter no mínimo 3 caracteres.';
    }

    if (!formState.neighborhood.trim()) {
      newErrors.neighborhood = 'Bairro é obrigatório.';
    } else if (formState.neighborhood.trim().length < 3) {
      newErrors.neighborhood = 'Bairro deve ter no mínimo 3 caracteres.';
    }

    if (!formState.numberAddress.trim()) {
      newErrors.numberAddress = 'Número é obrigatório.';
    } else if (isNaN(Number(formState.numberAddress)) || Number(formState.numberAddress) <= 0) {
      newErrors.numberAddress = 'Número inválido.';
    }
    
    if (!formState.stateId) {
      newErrors.stateId = 'Estado é obrigatório.';
    }

    if (!formState.cityId) {
      newErrors.cityId = 'Cidade é obrigatória.';
    }

    return newErrors;
  }, []);

  useEffect(() => {
    const validationErrors = validate(address);
    if (cepApiError) {
      validationErrors.cep = cepApiError;
    }

    const shownErrors: AddressFormErrors = {};
    
    (Object.keys(touchedFields) as Array<keyof TouchedFields>).forEach((key) => {
      if (validationErrors[key]) {
        shownErrors[key] = validationErrors[key];
      }
    });

    if (validationErrors.cep && (touchedFields.cep || cepApiError)) {
      shownErrors.cep = validationErrors.cep;
    }

    setErrors(shownErrors);
  }, [address, touchedFields, validate, cepApiError]);

  const disabledButton = useMemo(() => {
    const validationErrors = validate(address);
    return Object.keys(validationErrors).length > 0 || !!cepApiError;
  }, [address, validate, cepApiError]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: keyof AddressFormState) => {
    let value = event.target.value;
    if (name === 'cep' || name === 'numberAddress') {
      value = value.replace(/\D/g, '');
    }
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
    setCepApiError(undefined);
  }, []);

  return {
    address,
    errors,
    disabledButton,
    isAddressReadOnly,
    handleOnChangeInput,
    handleOnBlur,
    resetForm,
  };
};