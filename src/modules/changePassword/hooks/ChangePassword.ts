import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_USER } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';

interface PasswordForm {
  lastPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordErrors {
  lastPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

type TouchedFields = Partial<Record<keyof PasswordForm, boolean>>;

export const useChangePassword = () => {
  const [form, setForm] = useState<PasswordForm>({
    lastPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { request, loading } = useRequests();
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
  const [disabledButton, setDisabledButton] = useState(true);
  
  useEffect(() => {
    const newErrors: PasswordErrors = {};

    if (touchedFields.lastPassword && !form.lastPassword) {
      newErrors.lastPassword = 'Senha atual é obrigatória.';
    }

    if (touchedFields.newPassword) {
      if (!form.newPassword) newErrors.newPassword = 'Nova senha é obrigatória.';
      else if (form.newPassword.trim() !== form.newPassword) newErrors.newPassword = 'A senha não pode começar ou terminar com espaços.';
      else if (form.newPassword === form.lastPassword) newErrors.newPassword = 'A nova senha não pode ser igual à senha antiga.';
      else if (form.newPassword.length < 8) newErrors.newPassword = 'A senha deve ter no mínimo 8 caracteres.';
      else if (!/[a-z]/.test(form.newPassword)) newErrors.newPassword = 'A senha deve conter pelo menos uma letra minúscula.';
      else if (!/[A-Z]/.test(form.newPassword)) newErrors.newPassword = 'A senha deve conter pelo menos uma letra maiúscula.';
      else if (!/\d/.test(form.newPassword)) newErrors.newPassword = 'A senha deve conter pelo menos um número.';
    }

    if (touchedFields.confirmPassword) {
      if (!form.confirmPassword) newErrors.confirmPassword = 'Confirmação de senha é obrigatória.';
      else if (form.confirmPassword !== form.newPassword) newErrors.confirmPassword = 'As senhas não coincidem.';
    }
    
    setErrors(newErrors);
    
    const isFormValid =
      form.lastPassword &&
      form.newPassword &&
      Object.keys(newErrors).length === 0;

    setDisabledButton(!isFormValid);

  }, [form, touchedFields]);


  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: keyof PasswordForm) => {
    setForm((currentForm) => ({ ...currentForm, [name]: event.target.value }));
  };

  const handleOnBlur = (name: keyof PasswordForm) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };

  const handleChangePassword = async () => {
    const body = {
      lastPassword: form.lastPassword,
      newPassword: form.newPassword,
    };
    
    const result = await request(URL_USER, MethodsEnum.PATCH, undefined, body, 'Senha alterada com sucesso!');
    
    if (result) {
      navigate('/display');
    }
  };

  const handleCancel = () => {
    navigate('/display');
  };

  return {
    form,
    loading,
    errors,
    disabledButton,
    handleOnChangeInput,
    handleChangePassword,
    handleOnBlur,
    handleCancel,
  };
};