import { useEffect } from 'react';
import { Modal } from 'antd';

import { useAddress } from '../hooks/useAddress';
import { useLocation } from '../../location/hooks/useLocation';
import { AddressType } from '../../../shared/types/AddressType';

import Input from '../../../shared/components/inputs/input/Input';
import Select from '../../../shared/components/inputs/select/Select';
import Button from '../../../shared/components/buttons/button/Button';
import { useAddressForm } from '../hooks/useAdressForm';

interface AddressFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  addressToEdit?: AddressType;
}

const AddressFormModal = ({ open, onClose, onSuccess, addressToEdit }: AddressFormModalProps) => {
  const { createAddress, loading: addressLoading } = useAddress();
  const { states, cities, fetchStates, fetchCities, loading: locationLoading } = useLocation();
  const { 
    address, 
    errors, 
    disabledButton, 
    handleOnChangeInput, 
    handleChangeSelect, 
    handleOnBlur,
    resetForm,
  } = useAddressForm(addressToEdit);

  useEffect(() => {
    if (open) {
      fetchStates();
      if (addressToEdit?.city?.state?.id) {
        fetchCities(addressToEdit.city.state.id);
      }
    } else {
      resetForm();
    }
  }, [open, fetchStates, resetForm, addressToEdit, fetchCities]);

  const handleStateChange = (stateId: number) => {
    handleChangeSelect(stateId, 'stateId');
    handleChangeSelect(undefined, 'cityId'); 
    fetchCities(stateId);
  };

  const handleSubmit = async () => {
    const body = {
      cep: address.cep.replace(/\D/g, ''),
      numberAddress: Number(address.numberAddress),
      complement: address.complement.trim(),
      cityId: address.cityId,
    };

    if (addressToEdit) {
      await (addressToEdit.id, body);
    } else {
      await createAddress(body as any);
    }
    onSuccess();
  };

  return (
    <Modal
      title={addressToEdit ? 'Editar Endereço' : 'Adicionar Novo Endereço'}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          title="CEP (apenas números)"
          placeholder="00000000"
          value={address.cep}
          onChange={(e) => handleOnChangeInput(e, 'cep')}
          onBlur={() => handleOnBlur('cep')}
          errorMessage={errors.cep}
          type="tel"
          maxLength={8}
        />
        
        <Select
          title="Estado"
          placeholder="Selecione o estado"
          value={address.stateId}
          onChange={handleStateChange}
          onBlur={() => handleOnBlur('stateId')}
          loading={locationLoading}
          options={states.map(state => ({ value: state.id, label: state.name }))}
          errorMessage={errors.stateId}
        />

        <Select
          title="Cidade"
          placeholder="Selecione a cidade"
          value={address.cityId}
          onChange={(value) => handleChangeSelect(Number(value), 'cityId')}
          onBlur={() => handleOnBlur('cityId')}
          disabled={!address.stateId || cities.length === 0}
          loading={locationLoading}
          options={cities.map(city => ({ value: city.id, label: city.name }))}
          errorMessage={errors.cityId}
        />
        
        <Input
          title="Complemento"
          placeholder="Ex: Rua das Flores, Bairro Centro"
          value={address.complement}
          onChange={(e) => handleOnChangeInput(e, 'complement')}
          onBlur={() => handleOnBlur('complement')}
          errorMessage={errors.complement}
        />

        <Input
          title="Número"
          placeholder="Ex: 123"
          type="tel"
          maxLength={6}
          value={address.numberAddress}
          onChange={(e) => handleOnChangeInput(e, 'numberAddress')}
          onBlur={() => handleOnBlur('numberAddress')}
          errorMessage={errors.numberAddress}
        />
        
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={disabledButton || addressLoading}
          loading={addressLoading}
          style={{ width: '100%' }}
        >
          {addressToEdit ? 'Salvar Alterações' : 'Salvar Endereço'}
        </Button>
      </div>
    </Modal>
  );
};

export default AddressFormModal;