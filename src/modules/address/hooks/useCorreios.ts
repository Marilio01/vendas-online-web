import { useCallback } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { URL_CORREIOS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { ReturnCepType } from '../../../shared/types/ReturnCepType';

export const useCorreios = () => {
  const { request } = useRequests();

  const fetchCep = useCallback(
    async (cep: string) => {
      return request<ReturnCepType>(
        `${URL_CORREIOS}/${cep}`,
        MethodsEnum.GET,
      );
    },
    [request],
  );

  return {
    fetchCep,
  };
};