import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import ConnectionAPI, { MethodType } from '../functions/connection/connectionAPI';
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';
import { AuthType } from '../../modules/login/types/AuthType';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import { FirstScreenRoutesEnum } from '../../modules/firstScreen/routes';
import { connectionAPIPost } from '../functions/connection/connectionAPI';

export const useRequests = () => {
  const { setNotification, setUser, setLoading } = useGlobalReducer();

  const request = useCallback(async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
    message?: string,
    options?: {
      handleError?: boolean;
    }
  ): Promise<T | undefined> => {
    setLoading(true);
    const handleError = options?.handleError !== false;

    try {
      const result = await ConnectionAPI.connect<T>(url, method, body);
      if (saveGlobal) saveGlobal(result);
      if (message) setNotification(message, 'success');
      return result;
    } catch (error: any) {
      if (handleError) {
        if (error?.response?.status === 404) return undefined;
        const errorMessage = error?.response?.data?.message || 'Erro desconhecido.';
        setNotification(errorMessage, 'error');
        return undefined;
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setNotification]);

  const authRequest = useCallback(async (navigate: NavigateFunction, body: unknown): Promise<void> => {
    setLoading(true);
    try {
        const result = await connectionAPIPost<AuthType>(URL_AUTH, body);
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        localStorage.setItem('nomeCliente', result.user.name);
        navigate(FirstScreenRoutesEnum.FIRST_SCREEN);
    } catch (error) {
        setNotification(ERROR_INVALID_PASSWORD, 'error');
    } finally {
        setLoading(false);
    }
  }, [setLoading, setUser, setNotification]);

  return { request, authRequest };
};