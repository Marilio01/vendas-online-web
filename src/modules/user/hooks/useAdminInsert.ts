import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USER_ADMIN } from '../../../shared/constants/urls';
import { InsertUser } from '../../../shared/dtos/InsertUser.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { UserRoutesEnum } from '../routes';

export const useAdminInsert = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequests();
  const [disabledButton, setDisabledButton] = useState(true);
  const [user, setUser] = useState<InsertUser>({
    cpf: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  useEffect(() => {
    if (user.cpf && user.email && user.name && user.password && user.phone) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      [name]: event.target.value,
    }));
  };

  const handleCancelInsert = () => {
    navigate(UserRoutesEnum.ADMIN);
  };

  const handleInsertAdmin = async () => {
    const result = await request(URL_USER_ADMIN, MethodsEnum.POST, undefined, user);
    if (result) {
      navigate(UserRoutesEnum.ADMIN);
    }
  };

  return {
    user,
    disabledButton,
    loading,
    handleCancelInsert,
    handleInsertAdmin,
    handleOnChangeInput,
  };
};
