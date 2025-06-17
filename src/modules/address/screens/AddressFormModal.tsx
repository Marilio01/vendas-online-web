import { useEffect } from 'react';
import { Modal } from 'antd';
import { useAddress } from '../hooks/useAddress';
import { useLocation } from '../../location/hooks/useLocation';
import { useAddressForm } from '../hooks/useAdressForm';
import { CreateAddressType } from '../../../shared/types/AddressType';

import Input from '../../../shared/components/inputs/input/Input';
import Select from '../../../shared/components/inputs/select/Select';
import Button from '../../../shared/components/buttons/button/Button';

interface AddressFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddressFormModal = ({ open, onClose, onSuccess }: AddressFormModalProps) => {
  const { createAddress, addressLoading } = useAddress();
  const { states, cities, fetchStates, fetchCities } = useLocation();

  const {
    address,
    errors,
    disabledButton,
    isAddressReadOnly,
    handleOnChangeInput,
    handleOnBlur,
    resetForm,
  } = useAddressForm(fetchCities);

  useEffect(() => {
    if (open) {
      fetchStates();
      resetForm();
    }
  }, [open, fetchStates, resetForm]);

  const handleSubmit = async () => {
    if (disabledButton || !address.cityId) {
       return;
    }
    const body: CreateAddressType = {
      cep: address.cep.replace(/\D/g, ''),
      street: address.street,
      neighborhood: address.neighborhood,
      numberAddress: Number(address.numberAddress),
      complement: address.complement.trim(),
      cityId: address.cityId,
    };

    await createAddress(body);
    
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          title="CEP"
          placeholder="Digite para buscar o endereço"
          value={address.cep}
          onChange={(e) => handleOnChangeInput(e, 'cep')}
          onBlur={() => handleOnBlur('cep')}
          errorMessage={errors.cep}
          maxLength={8}
        />

        <Select
          title="Estado"
          placeholder="Preenchido pelo CEP"
          value={address.stateId}
          disabled={true}
          options={states.map(state => ({ value: state.id, label: state.name }))}
          errorMessage={errors.stateId}
        />

        <Select
          title="Cidade"
          placeholder="Preenchido pelo CEP"
          value={address.cityId}
          disabled={true}
          options={cities.map(city => ({ value: city.id, label: city.name }))}
          errorMessage={errors.cityId}
        />

        <Input
          title="Rua"
          placeholder={isAddressReadOnly ? "Preenchido pelo CEP" : "Digite a rua"}
          value={address.street}
          onChange={(e) => handleOnChangeInput(e, 'street')}
          onBlur={() => handleOnBlur('street')}
          disabled={isAddressReadOnly}
          errorMessage={errors.street}
        />

        <Input
          title="Bairro"
          placeholder={isAddressReadOnly ? "Preenchido pelo CEP" : "Digite o bairro"}
          value={address.neighborhood}
          onChange={(e) => handleOnChangeInput(e, 'neighborhood')}
          onBlur={() => handleOnBlur('neighborhood')}
          disabled={isAddressReadOnly}
          errorMessage={errors.neighborhood}
        />

        <Input
          title="Número"
          placeholder="Ex: 123"
          value={address.numberAddress}
          onChange={(e) => handleOnChangeInput(e, 'numberAddress')}
          onBlur={() => handleOnBlur('numberAddress')}
          errorMessage={errors.numberAddress}
        />
        
        <Input
          title="Complemento (Opcional)"
          placeholder="Ex: Apto 301, Bloco B"
          value={address.complement}
          onChange={(e) => handleOnChangeInput(e, 'complement')}
          onBlur={() => handleOnBlur('complement')}
          errorMessage={errors.complement}
        />
        
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={disabledButton || addressLoading}
          loading={addressLoading}
          style={{ width: '100%', marginTop: '8px' }}
        >
          Salvar Endereço
        </Button>
      </div>
    </Modal>
  );
};

export default AddressFormModal;