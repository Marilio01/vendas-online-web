import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Radio, Select, Button, Typography, Divider, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useCreateOrder } from '../../orderClient/hooks/useCreateOrder';
import { CreateOrderDTO } from '../../../shared/dtos/CreateOrder.dto';
import { PaymentCard, PaymentContainer, ButtonsContainer } from '../styles/payment.style';
import HeaderCliente from '../../../shared/components/headerCliente/HeaderCliente';
import Breadcrumb from '../../../shared/components/breadcrumb/Breadcrumb';

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
  
  const handleCancel = () => {
    navigate('/checkout');
  };

  const handleFinalizeOrder = async () => {
    const dto: CreateOrderDTO = {
      addressId,
      ...(paymentMethod === 'pix'
        ? {
            codePix: 'PIX_QR_CODE_EXAMPLE',
            datePayment: new Date().toISOString(),
          }
        : {
            amountPayments: installments,
          }),
    };

    const order = await createOrder(dto);
    if (order) {
      navigate('/compras');
    }
  };

  const generateInstallmentOptions = () => {
    const options = [];
    for (let i = 1; i <= 12; i++) {
      const installmentValue = (total / i).toFixed(2).replace('.', ',');
      options.push({
        value: i,
        label: `${i}x de R$ ${installmentValue}`,
      });
    }
    return options;
  };

  return (
    <>
      <HeaderCliente />
      <PaymentContainer>
        <PaymentCard>
          <Breadcrumb
            listBreadcrumb={[
              { name: 'Revisão do pedido', navigateTo: '/checkout' },
              { name: 'Forma de Pagamento' },
            ]}
          />
          <Title level={3} style={{ textAlign: 'center', marginTop: '16px' }}>Forma de Pagamento</Title>
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

          <ButtonsContainer>
            <Button
              size="large"
              onClick={handleCancel}
              disabled={loading}
            >
              Voltar
            </Button>

            <Button
              type="primary"
              size="large"
              icon={<CheckOutlined />}
              onClick={handleFinalizeOrder}
              loading={loading}
            >
              Finalizar e Pagar
            </Button>
          </ButtonsContainer>
        </PaymentCard>
      </PaymentContainer>
    </>
  );
};

export default Payment;