import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_USER } from '../../../shared/constants/urls';
import { InsertUser } from '../../../shared/dtos/InsertUser.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

interface RegisterErrors {
  name?: string;
  phone?: string;
  email?: string;
  cpf?: string;
  password?: string;
}

interface TouchedFields {
  name?: boolean;
  phone?: boolean;
  email?: boolean;
  cpf?: boolean;
  password?: boolean;
}

export const useRegister = () => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const { loading } = useGlobalReducer();

  const [user, setUser] = useState<InsertUser>({
    cpf: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [disabledButton, setDisabledButton] = useState(true);
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});

  useEffect(() => {
    const newErrors: RegisterErrors = {};
    const trimmedName = user.name.trim();
    const trimmedEmail = user.email.trim();

    if (touchedFields.name) {
      if (!trimmedName) newErrors.name = 'Nome é obrigatório.';
      else if (user.name !== trimmedName) newErrors.name = 'Nome não pode começar ou terminar com espaços.';
      else if (trimmedName.length < 3) newErrors.name = 'Nome deve ter no mínimo 3 caracteres.';
      else if (/\d/.test(trimmedName)) newErrors.name = 'O campo nome não pode conter números.';
    }

    if (touchedFields.email) {
      if (!trimmedEmail) newErrors.email = 'Email é obrigatório.';
      else if (user.email !== trimmedEmail) newErrors.email = 'Email não pode começar ou terminar com espaços.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) newErrors.email = 'Formato de email inválido.';
    }
    
    if (touchedFields.phone) {
      if (!user.phone) newErrors.phone = 'Telefone é obrigatório.';
      else if (user.phone.length < 11) newErrors.phone = 'Telefone deve ter 11 dígitos.';
      else if (/^(\d)\1+$/.test(user.phone)) newErrors.phone = 'Número de telefone inválido.';
    }

    if (touchedFields.cpf) {
      if (!user.cpf) newErrors.cpf = 'CPF é obrigatório.';
      else if (user.cpf.length < 11) newErrors.cpf = 'CPF deve ter 11 dígitos.';
      else if (/^(\d)\1+$/.test(user.cpf)) newErrors.cpf = 'CPF inválido.';
    }

    if (touchedFields.password) {
      if (!user.password) newErrors.password = 'Senha é obrigatória.';
      else if (user.password.trim() !== user.password) newErrors.password = 'A senha não pode começar ou terminar com espaços.';
      else if (user.password.length < 8) newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
      else if (!/[a-z]/.test(user.password)) newErrors.password = 'A senha deve conter pelo menos uma letra minúscula.';
      else if (!/[A-Z]/.test(user.password)) newErrors.password = 'A senha deve conter pelo menos uma letra maiúscula.';
      else if (!/\d/.test(user.password)) newErrors.password = 'A senha deve conter pelo menos um número.';
    }
    
    setErrors(newErrors);

    const isFormValid = 
        user.name.trim().length >= 3 && !/\d/.test(user.name.trim()) && user.name === user.name.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim()) && user.email === user.email.trim() &&
        user.phone.length === 11 && !/^(\d)\1+$/.test(user.phone) &&
        user.cpf.length === 11 && !/^(\d)\1+$/.test(user.cpf) &&
        user.password.length >= 8 && user.password === user.password.trim() && 
        /[a-z]/.test(user.password) && /[A-Z]/.test(user.password) && /\d/.test(user.password);
        
    setDisabledButton(!isFormValid);

  }, [user, touchedFields]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    let value = event.target.value;
    if (name === 'cpf' || name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 11);
    }
    setUser((currentUser) => ({ ...currentUser, [name]: value }));
  };

  const handleOnBlur = (_: React.FocusEvent<HTMLInputElement>, name: keyof InsertUser) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };

  const handleInsertUser = async () => {
    const result = await request(
      URL_USER, MethodsEnum.POST, undefined,
      { ...user, name: user.name.trim(), email: user.email.trim() },
      'Usuário cadastrado com sucesso!',
    );
    if (result) navigate('/login');
  };

  const handleCancelInsert = () => {
    setUser({ cpf: '', email: '', name: '', password: '', phone: '' });
    navigate('/login');
  };

  return {
    user,
    loading,
    errors,
    disabledButton,
    handleOnChangeInput,
    handleOnBlur,
    handleInsertUser,
    handleCancelInsert,
  };
};