// src/modules/address/components/AddressFormModal.tsx

import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useAddress } from '../hooks/useAddress';
import { useLocation } from '../../location/hooks/useLocation';
import { FullWidthButton, FullWidthInputNumber } from '../styles/AddressFormModal.styles';


interface AddressFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  cep: string;
  numberAddress: number;
  complement: string;
  stateId: number;
  cityId: number;
}

const AddressFormModal = ({ open, onClose, onSuccess }: AddressFormModalProps) => {
  const [form] = Form.useForm<FormData>();
  const { createAddress, loading: addressLoading } = useAddress();
  const { states, cities, fetchStates, fetchCities, loading: locationLoading } = useLocation();
  const [selectedState, setSelectedState] = useState<number | undefined>();

  useEffect(() => {
    if (open) {
      fetchStates();
    }
  }, [open]);

  const handleStateChange = (stateId: number) => {
    setSelectedState(stateId);
    form.setFieldsValue({ cityId: undefined });
    fetchCities(stateId);
  };

  const handleSubmit = async (data: FormData) => {
    const { stateId, ...addressData } = data;
    await createAddress(addressData);
    form.resetFields();
    onSuccess();
  };

  return (
    <Modal
      title="Adicionar Novo Endereço"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="CEP" name="cep" rules={[{ required: true, message: 'Por favor, insira o CEP!' }]}>
          <Input placeholder="00000-000" />
        </Form.Item>
        
        <Form.Item label="Estado" name="stateId" rules={[{ required: true, message: 'Por favor, selecione um estado!' }]}>
          <Select placeholder="Selecione o estado" onChange={handleStateChange} loading={locationLoading}>
            {states.map(state => (
              <Select.Option key={state.id} value={state.id}>
                {state.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Cidade" name="cityId" rules={[{ required: true, message: 'Por favor, selecione uma cidade!' }]}>
          <Select placeholder="Selecione a cidade" disabled={!selectedState || cities.length === 0} loading={locationLoading}>
            {cities.map(city => (
              <Select.Option key={city.id} value={city.id}>
                {city.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Número" name="numberAddress" rules={[{ required: true, message: 'Por favor, insira o número!' }]}>
          <FullWidthInputNumber placeholder="Ex: 123" />
        </Form.Item>
        
        <Form.Item label="Complemento" name="complement" rules={[{ required: true, message: 'Por favor, insira o complemento!' }]}>
          <Input placeholder="Ex: Casa, Apartamento 101" />
        </Form.Item>
        
        <Form.Item>
          <FullWidthButton type="primary" htmlType="submit" loading={addressLoading}>
            Salvar Endereço
          </FullWidthButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressFormModal;