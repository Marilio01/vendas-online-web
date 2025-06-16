import { useState, useEffect } from 'react';
import { Button, Modal, Space } from 'antd';
import { useRequests } from '../../../shared/hooks/useRequests';
import Input from '../../../shared/components/inputs/input/Input';
import { URL_USER } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { UserType } from '../../../modules/login/types/UserType';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

interface FormData {
  name: string;
  phone: string;
}
interface FormErrors {
  name?: string;
  phone?: string;
}

interface EditUserDataButtonProps {
  user: UserType;
  onUpdateSuccess: () => void; 
}

const EditUserDataButton = ({ user, onUpdateSuccess }: EditUserDataButtonProps) => {
  const { request } = useRequests();
  const { loading } = useGlobalReducer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone.replace(/\D/g, ''),
      });
    }
  }, [user]);

  useEffect(() => {
    const newErrors: FormErrors = {};
    const trimmedName = formData.name.trim();

    if (touched.name) {
      if (!trimmedName) newErrors.name = 'Nome é obrigatório.';
      else if (formData.name !== trimmedName) newErrors.name = 'Nome não pode ter espaços no início ou fim.';
      else if (trimmedName.length < 3) newErrors.name = 'Nome deve ter no mínimo 3 caracteres.';
      else if (/\d/.test(trimmedName)) newErrors.name = 'Nome não pode conter números.';
    }

    if (touched.phone) {
      if (!formData.phone) newErrors.phone = 'Telefone é obrigatório.';
      else if (formData.phone.length < 11) newErrors.phone = 'Telefone deve ter 11 dígitos.';
    }
    
    setErrors(newErrors);
    const isFormValid = trimmedName.length >= 3 && formData.name === trimmedName && formData.phone.length === 11;
    setDisabledButton(!isFormValid);
  }, [formData, touched]);


  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof FormData) => {
    let value = e.target.value;
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 11);
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOnBlur = (name: keyof FormData) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSave = async () => {
    const body = {
      name: formData.name.trim(),
      phone: formData.phone,
    };
    await request(URL_USER, MethodsEnum.PATCH, undefined, body, 'Dados alterados com sucesso!');
    hideModal();
    onUpdateSuccess();
  };


  return (
    <>
      <Button onClick={showModal}>Editar Dados</Button>

      <Modal
        title="Editar Dados Pessoais"
        open={isModalOpen}
        onCancel={hideModal}
        footer={
          <Space>
            <Button onClick={hideModal} danger>Cancelar</Button>
            <Button onClick={handleSave} type="primary" loading={loading} disabled={disabledButton}>Salvar</Button>
          </Space>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            title="Nome Completo"
            value={formData.name}
            onChange={(e) => handleOnChange(e, 'name')}
            onBlur={() => handleOnBlur('name')}
            errorMessage={errors.name}
          />
          <Input
            title="Telefone (apenas números)"
            value={formData.phone}
            onChange={(e) => handleOnChange(e, 'phone')}
            onBlur={() => handleOnBlur('phone')}
            maxLength={11}
            type="tel"
            errorMessage={errors.phone}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditUserDataButton;