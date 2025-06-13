import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, List, Row, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useAddress } from '../../address/hooks/useAddress';
import AddressFormModal from '../../address/screens/AddressFormModal';
import AddressList from '../../address/screens/AddressList';
import { CheckoutContainer, CheckoutTitle } from '../styles/Checkout.styles';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { convertNumberToMoney } from '../../../shared/functions/money';


const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCartReducer();
  const { addresses, fetchAddresses } = useAddress();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>();

  const cartItems = Array.isArray(cart) ? cart : [];
  const total = cartItems.reduce(
    (acc, item) => acc + (item.product.price || 0) * (item.amount ?? 1),
    0,
  );

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddressSuccess = () => {
    setIsAddressModalOpen(false);
    fetchAddresses();
  };

  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      alert('Por favor, selecione um endereço de entrega para continuar.');
      return;
    }
    navigate('/payment', {
      state: {
        addressId: selectedAddressId,
        total: total,
      },
    });
  };

  return (
    <>
      <AddressFormModal 
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSuccess={handleAddAddressSuccess}
      />

      <CheckoutContainer>
        <CheckoutTitle level={2}>Revisão do Pedido</CheckoutTitle>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <AddressList
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onSelectAddress={setSelectedAddressId}
              onAddNewAddress={() => setIsAddressModalOpen(true)}
            />

            <Card style={{ marginTop: '24px' }}>
              <List
                header={<Typography.Title level={5}>Itens no Carrinho</Typography.Title>}
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<img src={item.product.image} alt={item.product.name} width={60} style={{ borderRadius: 4 }} />}
                      title={`${item.product.name} (x${item.amount})`}
                      description={convertNumberToMoney(item.product.price)}
                    />
                    <div>
                      {convertNumberToMoney(item.product.price * item.amount)}
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card title="Resumo do Pedido">
              <Row justify="space-between">
                <Typography.Title level={4}>Total do Pedido</Typography.Title>
                <Typography.Title level={4}>{convertNumberToMoney(total)}</Typography.Title>
              </Row>
              <Button
                type="primary"
                size="large"
                icon={<CheckOutlined />}
                style={{ width: '100%', marginTop: '24px' }}
                onClick={handleProceedToPayment}
                disabled={!selectedAddressId}
              >
                Prosseguir para Pagamento
              </Button>
            </Card>
          </Col>
        </Row>
      </CheckoutContainer>
    </>
  );
};

export default Checkout;