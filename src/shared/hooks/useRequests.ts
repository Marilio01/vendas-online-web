import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import ConnectionAPI, {
  connectionAPIPost,
  MethodType,
} from '../functions/connection/connectionAPI';
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';
import { AuthType } from '../../modules/login/types/AuthType';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import { FirstScreenRoutesEnum } from '../../modules/firstScreen/routes';
import { MethodsEnum } from '../enums/methods.enum';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalReducer();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
    message?: string,
  ): Promise<T | undefined> => {
    setLoading(true);
    const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        if (message) {
          setNotification('Sucesso!', 'success', message);
        }
        return result;
      })
      .catch((error: any) => {
        if (
          error?.response?.status === 404 &&
          (method === MethodsEnum.PATCH || method === MethodsEnum.DELETE || method === MethodsEnum.GET)
        ) {
          return undefined;
        } else {
          const errorMessage = error?.response?.data?.message || 'Erro desconhecido ao processar sua solicitação.';
          setNotification(errorMessage, 'error');
          return undefined;
        }
      });
      
    setLoading(false);
    return returnObject;
  };

  const authRequest = async (navigate: NavigateFunction, body: unknown): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        localStorage.setItem('nomeCliente', result.user.name);
        navigate(FirstScreenRoutesEnum.FIRST_SCREEN);
        return result;
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, 'error');
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
  };
};