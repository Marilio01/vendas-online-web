import { Button, Card, Col, List, Row, Typography } from 'antd';
import { HomeOutlined, CheckOutlined } from '@ant-design/icons';
import { CheckoutContainer, CheckoutTitle } from '../styles/Checkout.styles'; 
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { convertNumberToMoney } from '../../../shared/functions/money';

const Checkout = () => {
  const { cart } = useCartReducer();
  const cartItems = Array.isArray(cart) ? cart : [];

  const total = cartItems.reduce(
    (acc, item) => acc + (item.product.price || 0) * (item.amount ?? 1),
    0,
  );

  const handleAddAddress = () => {
    console.log('Botão "Adicionar Endereço" clicado');
  };
  
  const handlePlaceOrder = () => {
    console.log('Botão "Fechar Pedido" clicado');
  };

  return (
    <CheckoutContainer>
      <CheckoutTitle level={2}>Revisão do Pedido</CheckoutTitle>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card>
            <Button 
              type="dashed" 
              icon={<HomeOutlined />} 
              style={{ marginBottom: '24px' }}
              onClick={handleAddAddress}
            >
              Adicionar Endereço
            </Button>
            
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
              onClick={handlePlaceOrder}
            >
              Fechar Pedido
            </Button>
          </Card>
        </Col>
      </Row>
    </CheckoutContainer>
  );
};

export default Checkout;