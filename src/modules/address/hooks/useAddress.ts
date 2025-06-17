import { useState, useCallback } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useAddressReducer } from '../../../store/reducers/addressReducer/useAddressReducer';
import { AddressType, CreateAddressType } from '../../../shared/types/AddressType';
import { URL_ADDRESS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';

export const useAddress = () => {
  const { request } = useRequests();
  const { addresses, setAddresses } = useAddressReducer();
  const [addressLoading, setAddressLoading] = useState(false);

  const fetchAddresses = useCallback(async () => {
    setAddressLoading(true);
    try {
      const result = await request<AddressType[]>(URL_ADDRESS, MethodsEnum.GET);
      if (result) {
        setAddresses(result);
      }
    } finally {
      setAddressLoading(false);
    }
  }, [request, setAddresses]);

  const createAddress = useCallback(async (data: CreateAddressType) => {
    setAddressLoading(true);
    try {
      await request(URL_ADDRESS, MethodsEnum.POST, undefined, data, 'Endereço adicionado!');
      await fetchAddresses();
    } finally {
      setAddressLoading(false);
    }
  }, [request, fetchAddresses]);

  const deleteAddress = useCallback(async (addressId: number) => {
    setAddressLoading(true);
    try {
      await request(`${URL_ADDRESS}/${addressId}`, MethodsEnum.DELETE, undefined, undefined, 'Endereço removido!');
      await fetchAddresses();
    } finally {
      setAddressLoading(false);
    }
  }, [request, fetchAddresses]);

  return {
    addresses,
    addressLoading,
    fetchAddresses,
    createAddress,
    deleteAddress,
  };
};