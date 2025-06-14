import { NavigateFunction, redirect } from 'react-router-dom';
import { LoginRoutesEnum } from '../../../modules/login/routes';
import { UserType } from '../../../modules/login/types/UserType';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';
import { URL_USER } from '../../constants/urls';
import { connectionAPIGet } from './connectionAPI';
import { UserTokenType } from '../../../modules/login/types/UserTokenType';
import { UserTypeEnum } from '../../enums/userType.enum'; 
import { UsuarioDisplayRoutesEnum } from '../../../modules/usuarioDisplay/routes';
import { persistor } from '../../../store';
import { jwtDecode } from 'jwt-decode';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const getUserInfoByToken = (): UserTokenType | undefined => {
  const token = getAuthorizationToken();

  if (token) {
    try {
      return jwtDecode<UserTokenType>(token);
    } catch (e) {
      console.error("Erro ao decodificar o token:", e);
      return undefined;
    }
  }

  return undefined;
};


export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN);
  }
  const user = await connectionAPIGet<UserType>(URL_USER).catch(() => {
    unsetAuthorizationToken();
  });

  if (!user) {
    return redirect(LoginRoutesEnum.LOGIN);
  }
  return null;
};

export const logout = async (navigate: NavigateFunction) => {
  await persistor.purge();

  unsetAuthorizationToken();
  
  navigate(LoginRoutesEnum.LOGIN);

  window.location.reload();
};

export const createAuthLoader = (allowedRoles?: UserTypeEnum[]) => {
  return () => {
    const token = getAuthorizationToken();

    if (!token) {
      throw redirect(LoginRoutesEnum.LOGIN);
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const userInfo = getUserInfoByToken();

      if (!userInfo || !allowedRoles.includes(userInfo.typeUser)) {
        throw redirect(UsuarioDisplayRoutesEnum.USUARIO_DISPLAY); 
      }
    }
    
    return null;
  };
};