import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, List, Row, Typography, Tooltip, Avatar, Modal } from 'antd'; 
import { CheckOutlined, DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { useCart } from '../../cart/hooks/useCart';
import { useAddress } from '../../address/hooks/useAddress';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';

import AddressList from '../../address/screens/AddressList';
import AddressFormModal from '../../address/screens/AddressFormModal';
import HeaderCliente from '../../../shared/components/headerCliente/HeaderCliente';
import { CartType } from '../../../shared/types/CartType';

import { convertNumberToMoney } from '../../../shared/functions/money';

import { 
  CheckoutContainer, 
  CheckoutTitle,
  CartItemContainer,
  ProductInfo,
  ItemControls,
  QuantityControl,
  ItemTotalPrice,
} from '../styles/Checkout.styles';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCartReducer();
  const { addresses } = useAddress();
  const { updateProductAmount, removeProductFromCart, loading: cartLoading } = useCart();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>();

  const [deleteModal, setDeleteModal] = useState<{ visible: boolean; id?: number }>({ visible: false });

  const confirmDelete = async () => {
    if (deleteModal.id) {
      await removeProductFromCart(deleteModal.id);
      setDeleteModal({ visible: false });
    }
  };

  const cartItems = Array.isArray(cart) ? cart : [];
  const total = cartItems.reduce(
    (acc, item) => acc + (item.product.price || 0) * (item.amount ?? 1),
    0,
  );

  const handleAddAddressSuccess = () => {
    setIsAddressModalOpen(false);
  };

  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      alert('Por favor, selecione um endereço de entrega para continuar.');
      return;
    }
    navigate('/payment', {
      state: { addressId: selectedAddressId, total: total },
    });
  };

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
        Deseja remover este item do carrinho?
      </Modal>
      <HeaderCliente />
      <AddressFormModal 
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSuccess={handleAddAddressSuccess}
      />

      <CheckoutContainer>
        <CheckoutTitle level={2}>Revisão do Pedido</CheckoutTitle>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <AddressList
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onSelectAddress={setSelectedAddressId}
            />

            <Card style={{ marginTop: '24px' }} title="Itens no Carrinho">
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item: CartType) => (
                  <List.Item
                    actions={[]}
                  >
                    <CartItemContainer>
                      <ProductInfo>
                        <List.Item.Meta
                          avatar={<Avatar src={item.product.image} size={64} shape="square" />}
                          title={<a href="#">{item.product.name}</a>}
                          description={`Preço unitário: ${convertNumberToMoney(item.product.price)}`}
                        />
                      </ProductInfo>
                      <ItemControls>
                        <QuantityControl>
                          <Button 
                            size="small"
                            icon={<MinusOutlined />} 
                            onClick={() => updateProductAmount(item, item.amount - 1)}
                            disabled={cartLoading}
                          />
                          <Typography.Text strong style={{ width: '20px', textAlign: 'center' }}>
                            {item.amount}
                          </Typography.Text>
                          <Button 
                            size="small"
                            icon={<PlusOutlined />} 
                            onClick={() => updateProductAmount(item, item.amount + 1)} 
                            disabled={cartLoading}
                          />
                        </QuantityControl>

                        <ItemTotalPrice>
                          {convertNumberToMoney(item.product.price * item.amount)}
                        </ItemTotalPrice>
                        
                        <Tooltip title="Remover produto">
                          <Button 
                            danger 
                            type="text" 
                            icon={<DeleteOutlined />} 
                            onClick={() => setDeleteModal({ visible: true, id: item.product.id })}
                            disabled={cartLoading}
                          />
                        </Tooltip>
                      </ItemControls>
                    </CartItemContainer>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Resumo do Pedido">
              <Row justify="space-between">
                <Typography.Title level={5}>Subtotal</Typography.Title>
                <Typography.Text>{convertNumberToMoney(total)}</Typography.Text>
              </Row>
              <Row justify="space-between" style={{ marginTop: '16px' }}>
                <Typography.Title level={4}>Total</Typography.Title>
                <Typography.Title level={4}>{convertNumberToMoney(total)}</Typography.Title>
              </Row>
              <Button
                type="primary"
                size="large"
                icon={<CheckOutlined />}
                style={{ width: '100%', marginTop: '24px' }}
                onClick={handleProceedToPayment}
                disabled={!selectedAddressId || cartItems.length === 0}
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