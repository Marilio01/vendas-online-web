import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductRoutesEnum } from '../../product/routes';
import Loading from '../../../shared/components/loading/Loading';
import { LoginRoutesEnum } from '../../login/routes';
import { UsuarioDisplayRoutesEnum } from '../../usuarioDisplay/routes';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';
import { getUserInfoByToken } from '../../../shared/functions/connection/auth';

const FirstScreen = () => {
  const navigate = useNavigate();

  const userToken = useMemo(() => getUserInfoByToken(), []);

  useEffect(() => {
    if (userToken) {
      if (userToken.typeUser === UserTypeEnum.Root || userToken.typeUser === UserTypeEnum.Admin) {
        navigate(ProductRoutesEnum.PRODUCT);
      } else if (userToken.typeUser === UserTypeEnum.User) {
        navigate(UsuarioDisplayRoutesEnum.USUARIO_DISPLAY);
      } else {
        navigate(LoginRoutesEnum.LOGIN);
      }
    } else {
      navigate(LoginRoutesEnum.LOGIN);
    }
  }, [userToken, navigate]);

  return <Loading />;
};

export default FirstScreen;