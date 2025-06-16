import { useState, useRef } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useAddressReducer } from '../../../store/reducers/addressReducer/useAddressReducer';
import { AddressType } from '../../../shared/types/AddressType';
import { URL_ADDRESS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

interface InsertAddressDTO {
  complement: string;
  numberAddress: number;
  cep: string;
  cityId: number;
}

export const useAddress = () => {
  const { request } = useRequests();
  const { addresses, setAddresses } = useAddressReducer();
  const [, setLoading] = useState(false);
  const { loading } = useGlobalReducer();

  const hasFetchedAddresses = useRef(false);

  const fetchAddresses = async () => {
    if (hasFetchedAddresses.current) return;
    hasFetchedAddresses.current = true;

    setLoading(true);
    const result = await request<AddressType[]>(URL_ADDRESS, MethodsEnum.GET);
    if (result) {
      setAddresses(result);
    }
    setLoading(false);
  };

  const createAddress = async (data: InsertAddressDTO) => {
    setLoading(true);
    await request(
      URL_ADDRESS,
      MethodsEnum.POST,
      undefined,
      data,
      'Endereço adicionado com sucesso!',
    );
    setLoading(false);
  };

  return {
    loading,
    addresses,
    fetchAddresses,
    createAddress,
  };
};
