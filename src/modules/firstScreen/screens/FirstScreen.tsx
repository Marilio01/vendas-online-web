import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductRoutesEnum } from '../../product/routes';
import { LoginRoutesEnum } from '../../login/routes';
import { UsuarioDisplayRoutesEnum } from '../../usuarioDisplay/routes';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';
import { getAuthorizationToken, getUserInfoByToken } from '../../../shared/functions/connection/auth';
import { connectionAPIGet } from '../../../shared/functions/connection/connectionAPI';
import { URL_USER } from '../../../shared/constants/urls';
import Loading from '../../../shared/components/loading/Loading';

const FirstScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = getAuthorizationToken();

      if (!token) {
        navigate(LoginRoutesEnum.LOGIN);
        return; 
      }

      try {
        await connectionAPIGet(URL_USER);

        const userInfo = getUserInfoByToken();

        if (!userInfo) {
            navigate(LoginRoutesEnum.LOGIN);
            return;
        }

        if (userInfo.typeUser === UserTypeEnum.Root || userInfo.typeUser === UserTypeEnum.Admin) {
          navigate(ProductRoutesEnum.PRODUCT);
        } else if (userInfo.typeUser === UserTypeEnum.User) {
          navigate(UsuarioDisplayRoutesEnum.USUARIO_DISPLAY);
        } else {
          navigate(LoginRoutesEnum.LOGIN);
        }

      } catch (error) {
        console.error("Falha na validação do token:", error);
        localStorage.removeItem('AUTH_TOKEN');
        navigate(LoginRoutesEnum.LOGIN);
      }
    })();

  }, [navigate]);

  return <Loading />;
};

export default FirstScreen;