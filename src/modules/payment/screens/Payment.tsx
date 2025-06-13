import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Radio, Select, Button, Typography, Divider, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useCreateOrder } from '../../orderClient/hooks/useCreateOrder';
import { CreateOrderDTO } from '../../../shared/dtos/CreateOrder.dto';
import { PaymentCard, PaymentContainer } from '../styles/payment.style';

const { Title, Text } = Typography;

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { createOrder, loading } = useCreateOrder();
  
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [installments, setInstallments] = useState(1);
  
  const { addressId, total } = state || {};

  if (!addressId || !total) {
    navigate('/checkout');
    return null;
  }

  const handleFinalizeOrder = async () => {
    let orderDTO: CreateOrderDTO;

    if (paymentMethod === 'pix') {
      orderDTO = {
        addressId,
        codePix: 'CHAVE_PIX_EXEMPLO',
      };
    } else {
      orderDTO = {
        addressId,
        amountPayments: installments,
      };
    }
    
    const order = await createOrder(orderDTO);
    if(order) {
      navigate('/compras');
    }
  };

  const generateInstallmentOptions = () => {
    const options = [];
    for (let i = 1; i <= 12; i++) {
      const installmentValue = (total / i).toFixed(2);
      options.push({
        value: i,
        label: `${i}x de R$ ${installmentValue}`,
      });
    }
    return options;
  };

  return (
    <PaymentContainer>
      <PaymentCard>
        <Title level={3} style={{ textAlign: 'center' }}>Forma de Pagamento</Title>
        <Radio.Group 
          onChange={(e) => setPaymentMethod(e.target.value)} 
          value={paymentMethod}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 24 }}
          size="large"
        >
          <Radio.Button value="pix">PIX</Radio.Button>
          <Radio.Button value="card">Cartão de Crédito</Radio.Button>
        </Radio.Group>

        <Divider />

        {paymentMethod === 'card' && (
          <Space direction="vertical" style={{width: '100%'}}>
            <Text>Parcelamento:</Text>
            <Select
              style={{ width: '100%' }}
              value={installments}
              onChange={(value) => setInstallments(value)}
              options={generateInstallmentOptions()}
            />
          </Space>
        )}

        {paymentMethod === 'pix' && (
          <div style={{ textAlign: 'center' }}>
            <Text>O pagamento será realizado via PIX.</Text>
          </div>
        )}

        <Button
          type="primary"
          size="large"
          icon={<CheckOutlined />}
          style={{ width: '100%', marginTop: '32px' }}
          onClick={handleFinalizeOrder}
          loading={loading}
        >
          Finalizar e Pagar
        </Button>
      </PaymentCard>
    </PaymentContainer>
  );
};

export default Payment;