import { useState } from 'react';
import { Button, Card, Empty, List, Radio } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { AddressType } from '../../../shared/types/AddressType';
import { useAddress } from '../hooks/useAddress';
import { insertMaskInCEP } from '../../../shared/functions/address';

import AddressFormModal from './AddressFormModal';

interface AddressListProps {
  addresses: AddressType[];
  selectedAddressId?: number;
  onSelectAddress: (addressId: number) => void;
}

const AddressList = ({ addresses, onSelectAddress, selectedAddressId }: AddressListProps) => {
  const { fetchAddresses } = useAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<AddressType | undefined>();

  const handleOpenModal = (address?: AddressType) => {
    setAddressToEdit(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    handleCloseModal();
    fetchAddresses();
  };

  return (
    <>
      <AddressFormModal 
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        addressToEdit={addressToEdit}
      />
      <Card 
        title={<><HomeOutlined /> Endereço de Entrega</>} 
        extra={<Button icon={<PlusOutlined />} onClick={() => handleOpenModal()}>Novo</Button>}
      >
        {addresses.length === 0 ? (
          <Empty description="Nenhum endereço cadastrado." image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <List
            dataSource={addresses}
            itemLayout="horizontal"
            renderItem={(address) => (
              <List.Item
                actions={[
                ]}
              >
                <Radio value={address.id} checked={selectedAddressId === address.id} onChange={() => onSelectAddress(address.id)}>
                  {`${address.complement}, ${address.numberAddress} - ${address.city?.name} - ${insertMaskInCEP(address.cep)}`}
                </Radio>
              </List.Item>
            )}
          />
        )}
      </Card>
    </>
  );
};

export default AddressList;