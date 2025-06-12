import { Button, Card, Empty, List, Radio } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { AddressType } from '../../../shared/types/AddressType';
import { insertMaskInCEP } from '../../../shared/functions/address';

interface AddressListProps {
  addresses: AddressType[];
  selectedAddressId?: number;
  onSelectAddress: (addressId: number) => void;
  onAddNewAddress: () => void;
}

const AddressList = ({ 
  addresses, 
  selectedAddressId, 
  onSelectAddress,
  onAddNewAddress 
}: AddressListProps) => {
  return (
    <Card 
      title={<><HomeOutlined /> Endereço de Entrega</>} 
      extra={<Button icon={<PlusOutlined />} onClick={onAddNewAddress}>Novo</Button>}
    >
      {addresses.length === 0 ? (
        <Empty description="Nenhum endereço cadastrado." image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Radio.Group 
          style={{ width: '100%' }} 
          onChange={(e) => onSelectAddress(e.target.value)} 
          value={selectedAddressId}
        >
          <List
            dataSource={addresses}
            renderItem={(address) => (
              <List.Item>
                <Radio value={address.id}>
                  {`${insertMaskInCEP(address.cep)}, ${address.numberAddress} - ${address.complement} (${address.city?.name})`}
                </Radio>
              </List.Item>
            )}
          />
        </Radio.Group>
      )}
    </Card>
  );
};

export default AddressList;