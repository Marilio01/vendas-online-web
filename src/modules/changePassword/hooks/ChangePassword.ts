import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_USER } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

interface PasswordForm {
  lastPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const [form, setForm] = useState<PasswordForm>({
    lastPassword: '',
    newPassword: '',
  });

  const { request, loading } = useRequests();
  const { setNotification } = useGlobalReducer();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    const allFieldsFilled = form.lastPassword && form.newPassword;
    setDisabledButton(!allFieldsFilled || loading);
  }, [form, loading]);

  const handleOnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof PasswordForm,
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [name]: event.target.value,
    }));
  };

  const handleChangePassword = async () => {
    try {
      const result = await request(
        URL_USER,
        MethodsEnum.PATCH,
        undefined,
        form,
        'Senha alterada com sucesso!',
      );

      if (result) {
        navigate('/display');
      }
    } catch (error: any) {
      setNotification(error?.message || 'Erro ao alterar senha', 'error');
    }
  };

  const handleCancel = () => {
    setForm({
      lastPassword: '',
      newPassword: '',
    });
    navigate('/display');
  };

  return {
    form,
    loading,
    disabledButton,
    handleOnChangeInput,
    handleChangePassword,
    handleCancel,
  };
};
