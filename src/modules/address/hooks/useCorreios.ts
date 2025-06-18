import { useCallback } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { URL_CORREIOS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { ReturnCepType } from '../../../shared/types/ReturnCepType';
import { MethodType } from '../../../shared/functions/connection/connectionAPI';

export const useCorreios = () => {
  const { request } = useRequests();

  const fetchCep = useCallback(
    async (cep: string, options?: { showGlobalError?: boolean }) => {
      const suppressGlobalError = options?.showGlobalError === false;

      return request<ReturnCepType>(
        `${URL_CORREIOS}/${cep}`,
        MethodsEnum.GET as MethodType,
        undefined,
        undefined,
        '',
        {
          handleError: !suppressGlobalError,
        },
      );
    },
    [request],
  );

  return {
    fetchCep,
  };
};