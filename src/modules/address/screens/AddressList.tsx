import { useEffect, useState } from 'react';
import { Button, Card, Empty, List, Radio, Tooltip, Typography, Modal, Space } from 'antd';
import { HomeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { AddressType } from '../../../shared/types/AddressType';
import { useAddress } from '../hooks/useAddress';
import { insertMaskInCEP } from '../../../shared/functions/address';
import AddressFormModal from './AddressFormModal';

const { Text } = Typography;

interface AddressListProps {
  addresses: AddressType[];
  selectedAddressId?: number;
  onSelectAddress: (addressId: number) => void;
}

const AddressList = ({ addresses, onSelectAddress, selectedAddressId }: AddressListProps) => {
  const { fetchAddresses, deleteAddress, addressLoading } = useAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ visible: boolean; id?: number }>({ visible: false });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    fetchAddresses();
    handleCloseModal();
  };

  const confirmDelete = async () => {
    if (deleteModal.id) {
      await deleteAddress(deleteModal.id);
      setDeleteModal({ visible: false });
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []); 

  return (
    <>
      <Modal
        open={deleteModal.visible}
        title="Tem certeza?"
        onCancel={() => setDeleteModal({ visible: false })}
        onOk={confirmDelete}
        okText="Sim, remover"
        cancelText="Cancelar"
      >
        Deseja remover este endereço?
      </Modal>

      <AddressFormModal 
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
      
      <Card 
        title={<><HomeOutlined /> Endereço de Entrega</>} 
        extra={<Button icon={<PlusOutlined />} onClick={handleOpenModal}>Novo Endereço</Button>}
        loading={addressLoading}
      >
        {!addressLoading && addresses.length === 0 ? (
          <Empty description="Nenhum endereço cadastrado." image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <List
            dataSource={addresses}
            itemLayout="horizontal"
            renderItem={(address: AddressType) => (
              <List.Item
                actions={[
                  <Tooltip title="Remover Endereço">
                    <Button 
                      danger
                      type="text" 
                      icon={<DeleteOutlined />} 
                      onClick={() => setDeleteModal({ visible: true, id: address.id })}
                    />
                  </Tooltip>
                ]}
              >
                <Radio 
                  value={address.id} 
                  checked={selectedAddressId === address.id} 
                  onChange={() => onSelectAddress(address.id)}
                  style={{ width: '100%' }}
                >
                  <Space direction="vertical" align="start">
                    <Text strong>{`${address.street}, ${address.numberAddress}`}</Text>
                    <Text type="secondary">{`${address.neighborhood} - ${address.city?.name}/${address.city?.state?.uf}`}</Text>
                    <Text type="secondary">{insertMaskInCEP(address.cep)}</Text>
                  </Space>
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