import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_USER } from '../../../shared/constants/urls';
import { InsertUser } from '../../../shared/dtos/InsertUser.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

export const useRegister = () => {

  const [user, setUser] = useState<InsertUser>({
    cpf: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  const navigate = useNavigate();

  const { request, loading } = useRequests();
  const { setNotification } = useGlobalReducer();

  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    const allFieldsFilled =
      user.name && user.phone && user.email && user.cpf && user.password;
    setDisabledButton(!allFieldsFilled || loading);
  }, [user, loading]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setUser((currentUser) =>({
      ...currentUser,
      [name]: event.target.value,
    }));
  };

  const handleInsertUser = async () => {
    try {
      const result = await request(URL_USER, MethodsEnum.POST, undefined, user);
      if (result) {
        navigate('/login');
      }
    } catch (error: any) {
      setNotification(error?.message || 'Erro ao cadastrar usuário', 'error');
    }
  };

  const handleCancelInsert = () => {
    setUser({
      cpf: '',
      email: '',
      name: '',
      password: '',
      phone: '',
    });

    navigate('/login');
  };

  return {
    user,
    loading,
    disabledButton,
    handleOnChangeInput,
    handleInsertUser,
    handleCancelInsert,
  };
};
